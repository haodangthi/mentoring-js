import schedule from 'node-schedule'
import {
  failTaskForToday,
  setTaskForToday,
} from '../database-methods/task-for-today'
import { updateAchievementsAndStatus } from '../database-methods/challenge'

export function setSchedule(challengeId: string) {
  schedule.scheduleJob('0 12 * * *', async () => {
    await failTaskForToday(challengeId)
    await setTaskForToday(challengeId)
    await updateAchievementsAndStatus(challengeId)
  })
}
