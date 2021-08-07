import { getChallengeFromDatabaseById } from '../database-methods/challenge/get-challenge'
import { ActualAchievement } from '../../models'

export async function getActualAchievements(
  challengeId: string
): Promise<ActualAchievement[]> {
  const challenge = await getChallengeFromDatabaseById(challengeId)
  return challenge?.actualAchievements || []
}
