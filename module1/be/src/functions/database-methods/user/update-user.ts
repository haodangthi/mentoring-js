import { User } from '../../../schemas/user'

export function updateUser(userId: string, data: any) {
  return User.findByIdAndUpdate(userId, data)
}
