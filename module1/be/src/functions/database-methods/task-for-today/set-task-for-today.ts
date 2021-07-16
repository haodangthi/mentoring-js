import { IChallenge } from '../../../models'
import { getTaskForToday } from '../../methods'
import { updateTaskForToday } from './update-task-for-today'

export async function setTaskForToday(
  challengeId: string
): Promise<IChallenge> {
  const todayTask = await getTaskForToday(challengeId)

  return updateTaskForToday(challengeId, todayTask)
}
