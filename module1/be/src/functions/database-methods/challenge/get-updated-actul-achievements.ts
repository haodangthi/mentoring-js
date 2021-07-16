import { getActualAchievements, getTaskArchive } from '../../methods'
import { convertMongooseModel, getUpdatedAchievements } from '../../helpers'
import { updateAllAchievementStatuses } from '../../helpers/update-actual-achievement'

export async function getUpdatedActualAchievements(challengeId: string) {
  const actualAchievements = await getActualAchievements(challengeId)
  const archiveTasks = await getTaskArchive(challengeId)
  const parsedActualAchievements = convertMongooseModel(actualAchievements)
  const parsedArchiveTasks = convertMongooseModel(archiveTasks)

  const achievementsWithCheckMethods = getUpdatedAchievements(
    parsedActualAchievements
  )

  return updateAllAchievementStatuses(
    parsedActualAchievements,
    parsedArchiveTasks,
    achievementsWithCheckMethods
  )
}
