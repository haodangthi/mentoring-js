import { TaskForToday } from '../../models'
import { State } from '../../models/enums/state'
import { getDayDifference } from '../helpers'
import { Challenge } from '../../components'
import { getChallengeFromDatabaseById } from '../database-methods/challenge/get-challenge'

export async function getTaskForToday(
  challengeId: string
): Promise<TaskForToday> {
  const challenge = await getChallengeFromDatabaseById(challengeId)
  return calculateTaskForToday(challenge as any)
}

export function calculateTaskForToday(
  challenge: Challenge
): TaskForToday | any {
  const today = new Date().toISOString()
  const todayIndex = getDayDifference(challenge?.startDate, today)
  if (challenge) {
    return {
      ...challenge.tasksOrder[todayIndex],
      status: {
        state: State.Pending,
        updated: today,
      },
    }
  }
}
