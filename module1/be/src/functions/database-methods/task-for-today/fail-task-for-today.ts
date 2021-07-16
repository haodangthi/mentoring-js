import { getTaskForTodayFromDB } from '../challenge/get-current-task'
import { convertMongooseModel } from '../../helpers'
import { State } from '../../../models/enums'
import { addToTasksArchive } from '../challenge'
import { updateTask } from './update-task-for-today'

export async function failTaskForToday(challengeId: string) {
  const currentTask = await getTaskForTodayFromDB(challengeId)
  const parsedTask = convertMongooseModel(currentTask)

  if (parsedTask.status.state === State.Pending) {
    const failedTask = updateTask(parsedTask, false)
    await addToTasksArchive(challengeId, failedTask)
  }
}
