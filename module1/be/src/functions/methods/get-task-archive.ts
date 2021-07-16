import { ArchiveItem } from '../../models'
import { getChallengeFromDatabaseById } from '../database-methods/challenge/get-challenge'

export async function getTaskArchive(
  challengeId: string
): Promise<ArchiveItem[]> {
  const challenge = await getChallengeFromDatabaseById(challengeId)
  return challenge?.archiveTasks || []
}
