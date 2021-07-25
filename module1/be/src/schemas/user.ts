import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import { IUser } from '../models/user'

const userSchema = new mongoose.Schema<IUser>({
  id: {
    type: String,
    required: false,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: false,
  },
  activeChallenge: {
    type: String,
    required: false,
  },
  completedChallenges: {
    type: Array,
    required: false,
  },
})

userSchema.pre('save', async function (next) {
  const hash = await bcrypt.hash(this.password, 10)
  this.password = hash
  next()
})

userSchema.methods.isValidPassword = async function (password) {
  const compare = await bcrypt.compare(password, this.password)

  return compare
}

const User = mongoose.model('User', userSchema)
export { User }
