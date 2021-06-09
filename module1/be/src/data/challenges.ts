import { Challenge } from '../models'
import * as tasksList from './tasks.json'
import * as achievements from './achievements.json'
import Task from '../models/task'

const challenge: Challenge = {
  id: 'learn-to-code',
  tasksOrder: tasksList as any,
  startDate: new Date(),
  achievements: achievements as any,
  actualAchievements: [],
}

// у челеджа должно быть поле achievements при создании
// мы создаем ч. у него есть Имя
