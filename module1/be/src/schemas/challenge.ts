import mongoose from 'mongoose'

const challengeSchema = new mongoose.Schema({
  id: {
    type: String,
    required: false,
  },
  duration: {
    type: Number,
    required: false,
  },
  state: {
    type: String,
    required: false,
  },
  startDate: {
    type: String,
    required: false,
  },
  currentTask: {
    type: Object,
    required: false,
  },
  tasksOrder: {
    type: Array,
    required: false,
  },
  tasksStatus: {
    type: Object,
    required: false,
  },
  archiveTasks: {
    type: Array,
    required: false,
  },
  achievementsStatus: {
    type: Object,
    required: false,
  },
  achievements: {
    type: Array,
    required: false,
  },
  actualAchievements: {
    type: Array,
    required: false,
  },
  achievementsNumber: {
    type: Number,
    required: false,
  },
})

const Challenge = mongoose.model('Challenge', challengeSchema)
export { Challenge }
