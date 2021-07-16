import { Challenge } from '../../../schemas/challenge'
import { IChallenge } from '../../../models'

export function getChallengeFromDatabaseById(id: string): Promise<IChallenge> {
  return Challenge.findById(id)
}
