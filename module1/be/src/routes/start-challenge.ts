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
import {
  deleteAllTaskInArchive,
  getChallengeFromDatabaseById,
} from '../functions/database-methods/challenge'

const router = express.Router()

router.get('/start-new-challenge', async (req, res) => {
  try {
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

    await updateUser((req as any).user._id, {
      activeChallenge: newChallenge._id,
    })
    res.status(201).json({ challengeId: newChallenge._id })
  } catch (error) {
    res.status(500).json({ error })
  }
})

router.get('/challenge/:id', async (req, res) => {
  try {
    const challenge = await getChallengeFromDatabaseById(req.params.id)
    res.status(201).json(challenge)
  } catch (error) {
    res.status(500).json({ error })
  }
})

router.get('/challenges/:id/actual-achievements', async (req, res) => {
  try {
    const actualAchievements = await getActualAchievements(req.params.id)
    res.status(201).json(actualAchievements)
  } catch (error) {
    res.status(500).json({ error })
  }
})

router.get('/challenges/:id/task-for-today', async (req, res) => {
  try {
    const todayTask = await getTaskForToday(req.params.id)
    res.status(201).json(todayTask)
  } catch (error) {
    res.status(500).json({ error })
  }
})

router.get('/challenges/:id/tasks-archive', async (req, res) => {
  try {
    const tasksArchive = await getTaskArchive(req.params.id)
    res.status(201).json(tasksArchive)
  } catch (error) {
    res.status(500).json({ error })
  }
})

router.delete('/challenges/:id/tasks-archive/delete-all', async (req, res) => {
  try {
    await deleteAllTaskInArchive(req.params.id)
    res.status(201)
  } catch (error) {
    res.status(500).json({ error })
  }
})

export { router as ChallengeRoute }
