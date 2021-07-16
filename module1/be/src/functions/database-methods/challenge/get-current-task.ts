import { getChallengeFromDatabaseById } from './get-challenge'
import { TaskForToday } from '../../../models'

export async function getTaskForTodayFromDB(
  challengeId: string
): Promise<TaskForToday> {
  const challenge = await getChallengeFromDatabaseById(challengeId)
  return challenge?.currentTask
}
