import express from 'express'
import {
  getActualAchievements,
  getTaskArchive,
  getTaskForToday,
  startNewChallenge,
} from '../functions/methods'
import { Task } from '../schemas/task'
import { Achievement } from '../schemas/achievement'
import { Challenge } from '../schemas/challenge'
import { convertMongooseModel } from '../functions/helpers'
import { setTaskForToday } from '../functions/database-methods/task-for-today'
import { setSchedule } from '../functions/helpers/set-schedule'
import { updateUser } from '../functions/database-methods/user'

const router = express.Router()

router.get('/start-new-challenge', async (req, res) => {
  const allTasks = await Task.find({})
  const allAchievements = await Achievement.find({})

  const challenge = startNewChallenge(
    convertMongooseModel(allTasks),
    convertMongooseModel(allAchievements)
  )

  let newChallenge = await new Challenge(challenge)
  newChallenge = await newChallenge.save()

  await setTaskForToday(newChallenge._id)
  setSchedule(newChallenge._id)

  await updateUser((req as any).user._id, { activeChallenge: newChallenge._id })
  res.status(201).json({ challengeId: newChallenge._id })
})

router.get('/challenges/:id/actual-achievements', async (req, res) => {
  const actualAchievements = await getActualAchievements(req.params.id)
  res.status(201).json(actualAchievements)
})

router.get('/challenges/:id/task-for-today', async (req, res) => {
  const todayTask = await getTaskForToday(req.params.id)
  res.status(201).json(todayTask)
})

router.get('/challenges/:id/tasks-archive', async (req, res) => {
  const tasksArchive = await getTaskArchive(req.params.id)
  res.status(201).json(tasksArchive)
})

export { router as ChallengeRoute }
