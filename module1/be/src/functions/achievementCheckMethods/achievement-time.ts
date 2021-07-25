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

const TASK_QUANTITY = 5
const HOUR = 8

export function checkTaskCompletionByHour(tasks: ArchiveItem[]) {
  return (
    tasks.filter((task) => isTaskCompletedBeforeTime(task, HOUR)).length >=
    TASK_QUANTITY
  )
}
