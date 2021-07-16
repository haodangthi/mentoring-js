import { ArchiveItem } from '../../../models'
import { getTaskArchive } from '../../methods'
import { updateChallengeInDatabaseById } from './update-challenge'

export async function addToTasksArchive(
  challengeId: string,
  task: ArchiveItem
) {
  const archiveTasks = await getTaskArchive(challengeId)
  const payload = {
    archiveTasks: [ ...archiveTasks, task ],
  }
  return updateChallengeInDatabaseById(challengeId, payload)
}
