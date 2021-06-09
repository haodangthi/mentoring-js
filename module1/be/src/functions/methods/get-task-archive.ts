import { ArchiveItem, IChallenge } from '../../models'
import { getById } from '../helpers/get-by-id'

export function getTaskArchive(
  challengeId: string,
  challengeList: IChallenge[]
): ArchiveItem[] {
  return getById(challengeId, challengeList).archiveTasks
}
