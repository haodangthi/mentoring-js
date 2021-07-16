import { calculateAchievementsStatus } from '../../methods'
import { getUpdatedActualAchievements } from './get-updated-actul-achievements'
import { updateChallengeInDatabaseById } from './update-challenge'

export async function updateAchievementsAndStatus(challengeId: string) {
  const updatedActualAchievements = await getUpdatedActualAchievements(
    challengeId
  )
  const payload = {
    actualAchievements: updatedActualAchievements,
    achievementsStatus: calculateAchievementsStatus(updatedActualAchievements),
  }

  return await updateChallengeInDatabaseById(challengeId, payload)
}
