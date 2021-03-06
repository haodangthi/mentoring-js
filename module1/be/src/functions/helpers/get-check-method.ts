import {
  getCompletedInRow,
  areTasksCompleted,
  getTasksCompletedOnWeekday,
  isTaskCompletedBeforeTime,
  are5TasksCompletedBefore8,
  getCompleted7DaysInRow,
} from '../../functions/achievementCheckMethods'
import { AchievementItem } from '../../models'

const checkMethods: { [index: string]: any } = {
  areTasksCompleted,
  getTasksCompletedOnWeekday,
  isTaskCompletedBeforeTime,
  getCompletedInRow,
  are5TasksCompletedBefore8,
  getCompleted7DaysInRow,
}

export const getCheckMethod = (achievement: AchievementItem) => {
  return {
    ...achievement,
    checkComplete: checkMethods[`${achievement.checkMethod}`],
  }
}

export const getUpdatedAchievements = (achievements: AchievementItem[]) => {
  return achievements?.map(getCheckMethod)
}
