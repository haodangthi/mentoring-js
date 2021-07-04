import { ArchiveItem } from '../../../models'
import { addToTasksArchive } from '../challenge'
import { updateTask, updateTaskForToday } from './update-task-for-today'

export async function completeTaskForToday(
  challengeId: string,
  task: ArchiveItem
) {
  const completedTask = updateTask(task, true)

  await addToTasksArchive(challengeId, completedTask)

  await updateTaskForToday(challengeId, completedTask)
}
