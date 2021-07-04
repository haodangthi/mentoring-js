import { ArchiveItem, IChallenge } from '../../../models'
import { updateChallengeInDatabaseById } from '../challenge/update-challenge'
import { State } from '../../../models/enums'

export function updateTaskForToday(
  challengeId: string,
  task: ArchiveItem
): Promise<IChallenge> {
  const payload = {
    currentTask: task,
  }

  return updateChallengeInDatabaseById(challengeId, payload)
}

export function updateTask(task: ArchiveItem, completed: boolean): ArchiveItem {
  return {
    ...task,
    status: {
      updated: new Date().toISOString(),
      state: completed ? State.Success : State.Failure,
    },
  }
}
