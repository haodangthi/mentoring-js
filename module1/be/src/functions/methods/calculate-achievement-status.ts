import { ActualAchievement, Status } from '../../models'

export function calculateAchievementsStatus(
  achievementsList: ActualAchievement[]
): Map<string, Status> {
  const status = new Map()
  achievementsList.forEach((item) => {
    status.set(item.id, item.status)
  })
  return status
}
