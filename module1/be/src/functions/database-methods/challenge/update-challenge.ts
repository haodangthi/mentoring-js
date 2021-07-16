import { Challenge } from '../../../schemas/challenge'
import { IChallenge } from '../../../models'

export function updateChallengeInDatabaseById(
  id: string,
  data: any
): Promise<IChallenge> {
  return Challenge.findByIdAndUpdate(id, data)
}
