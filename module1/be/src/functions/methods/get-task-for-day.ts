import { IChallenge, TaskForToday } from '../../models'
import { State } from '../../models/enums/state'
import { getById } from '../helpers/get-by-id'
import { getDayDifference } from '../helpers'
import { Challenge } from '../../components'

export function getTaskForToday(
  challengeId: string,
  challengesList: IChallenge[]
): TaskForToday | any {
  const challenge = getById(challengeId, challengesList)
  return calculateTaskForToday(challenge)
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
