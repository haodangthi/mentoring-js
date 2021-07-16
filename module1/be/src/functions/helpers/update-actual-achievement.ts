import {
  AchievementItem,
  ActualAchievement,
  ArchiveItem,
  Status,
} from '../../models'
import { State } from '../../models/enums'
import { getById } from './get-by-id'

export function updateAchievementStatus(
  achievement: ActualAchievement,
  completed: boolean
): ActualAchievement {
  return {
    ...achievement,
    status: {
      updated: new Date().toISOString(),
      state: completed ? State.Success : State.Failure,
    },
  }
}

export function findCheckMethod(
  achievementId: string,
  achievements: AchievementItem[]
) {
  return getById(achievementId, achievements).checkComplete
}

export function setActualAchievementStatus(
  tasks: ArchiveItem[],
  achievement: ActualAchievement,
  checkMethod: any
): ActualAchievement {
  return checkMethod(tasks)
    ? updateAchievementStatus(achievement, true)
    : updateAchievementStatus(achievement, false)
}

export function updateAllAchievementStatuses(
  actualAchievements: ActualAchievement[],
  archiveTasks: ArchiveItem[],
  achievements: AchievementItem[]
): ActualAchievement[] {
  return actualAchievements.map((achievement) => {
    const checkMethod = findCheckMethod(achievement.id, achievements)
    return setActualAchievementStatus(archiveTasks, achievement, checkMethod)
  })
}
