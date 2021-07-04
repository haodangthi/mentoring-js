import { updateChallengeInDatabaseById } from './update-challenge'
import { getUpdatedActualAchievements } from './get-updated-actul-achievements'

export async function updateActualAchievements(challengeId: string) {
  const updatedActualAchievements = await getUpdatedActualAchievements(
    challengeId
  )
  const payload = {
    actualAchievements: updatedActualAchievements,
  }

  return updateChallengeInDatabaseById(challengeId, payload)
}
