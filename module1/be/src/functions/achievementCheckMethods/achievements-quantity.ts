import { ArchiveItem } from '../../models'
import { State } from '../../models/enums/state'

export function areTasksCompleted(
  tasks: ArchiveItem[],
  quantity: number
): boolean {
  return tasks.filter(isTaskCompleted).length >= quantity
}

export function isTaskCompleted(task: ArchiveItem): boolean {
  return task.status.state === State.Success
}
