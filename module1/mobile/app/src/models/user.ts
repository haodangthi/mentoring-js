import { IChallenge } from './challenge'

export interface IUser extends Document {
  username: string
  password: string
  id: string
  activeChallenge?: string
  completedChallenges?: IChallenge[]
}
