import mongoose from 'mongoose'

const achievementSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: false,
  },
  checkMethod: {
    type: String,
    required: false,
  },
})

const Achievement = mongoose.model('Achievement', achievementSchema)
export { Achievement }
