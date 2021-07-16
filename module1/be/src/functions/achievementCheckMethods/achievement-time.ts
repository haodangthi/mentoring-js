import { ArchiveItem } from '../../models'
import moment from 'moment'
import { isTaskCompleted } from './achievements-quantity'

export function getTaskHour(task: ArchiveItem) {
  return isTaskCompleted(task) && moment(task.status.updated).get('hour')
}

export function isTaskCompletedBeforeTime(
  task: ArchiveItem,
  hour: number
): boolean {
  return getTaskHour(task) < hour
}

export function are5TasksCompletedBefore8(tasks: ArchiveItem[]) {
  return tasks.filter((task) => isTaskCompletedBeforeTime(task, 8)).length >= 5
}
