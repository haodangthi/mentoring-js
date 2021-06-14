import {
  getCompletedInRow,
  areTasksCompleted,
  getTasksCompletedOnWeekday,
  isTaskCompletedBeforeTime,
} from '../../functions/achievementCheckMethods'

const checkMethods: { [index: string]: any } = {
  areTasksCompleted,
  getTasksCompletedOnWeekday,
  isTaskCompletedBeforeTime,
  getCompletedInRow,
}

export const getCheckMethod = (achievement: any) => {
  return {
    ...achievement,
    checkComplete: checkMethods[`${achievement.checkMethod}`],
  }
}

export const getUpdatedAchievements = (achievements: any[]) => {
  return achievements.map((achievement) => {
    return getCheckMethod(achievement)
  })
}
