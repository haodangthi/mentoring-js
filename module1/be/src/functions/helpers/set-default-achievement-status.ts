import { AchievementItem, ActualAchievement } from '../../models'
import { State } from '../../models/enums/state'

export function setDefaultAchievementStatus(
  achievement: AchievementItem
): ActualAchievement {
  return {
    ...achievement,
    status: {
      state: State.Pending,
      updated: new Date().toISOString(),
    },
  }
}

export function setAchievementsStatuses(
  achievements: AchievementItem[]
): ActualAchievement[] {
  return achievements.map(setDefaultAchievementStatus)
}
