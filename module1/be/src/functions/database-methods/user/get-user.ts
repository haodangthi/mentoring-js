import { User } from '../../../schemas/user'
import { IUser } from '../../../models/user'

export function getUser(userId: string): Promise<IUser> {
  return User.findById(userId)
}
