import express from 'express'
import * as tasks from '../data/tasks.json'
import * as achievements from '../data/achievements.json'
import { startNewChallenge } from '../functions/methods'
import challengeService from '../services/challenges.service'

const route = express.Router()

route.get('/start-new-challenge', (req, res) => {
  const challenge = startNewChallenge(
    (tasks as any).default,
    (achievements as any).default
  )
  challengeService.addNewChallenge(challenge)
  res.status(201).json(challenge)
})

route.get('/challenges/:id/actual-achievements', (req, res) => {
  const actualAchievements =
    challengeService.getActualAchievementsByChallengeId(req.params.id)
  res.status(201).json(actualAchievements)
})

route.get('/challenges/:id/task-for-today', (req, res) => {
  const todayTask = challengeService.getTaskForTodayByChallengeId(req.params.id)
  res.status(201).json(todayTask)
})

route.get('/challenges/:id/tasks-archive', (req, res) => {
  const challengeId = req.params.id
  const tasksArchive = challengeService.getTaskArchiveByChallengeId(challengeId)
  res.status(201).json(tasksArchive)
})

export default route
