import { IChallenge, TaskForToday } from '../../models'
import { State } from '../../models/enums/state'
import { getById } from '../helpers/get-by-id'
import { getDayDifference } from '../helpers'

export function getTaskForToday(
  challengeId: string,
  challengesList: IChallenge[]
): TaskForToday | any {
  const challenge = getById(challengeId, challengesList)
  const today = new Date()
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
