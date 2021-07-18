import { ArchiveItem } from '../../../models'
import { getTaskArchive } from '../../methods'
import { updateChallengeInDatabaseById } from './update-challenge'

export async function addToTasksArchive(
  challengeId: string,
  task: ArchiveItem
) {
  const archiveTasks = await getTaskArchive(challengeId)
  const archivedTask = archiveTasks.find(task => task.id === task.id)

  if (!archivedTask) {
    const payload = {
      archiveTasks: [ ...archiveTasks, task ],
      currentTask: task,
    }
    return updateChallengeInDatabaseById(challengeId, payload)
  }
}

export function deleteAllTaskInArchive(challengeId: string,) {
  const payload = {
    archiveTasks: [],
  }
  return updateChallengeInDatabaseById(challengeId, payload)
}
