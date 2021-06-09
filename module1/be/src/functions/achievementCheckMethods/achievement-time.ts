import { ArchiveItem } from '../../models'
import * as moment from 'moment'
import { isTaskCompleted } from './achievements-quantity'

export function getTaskHour(task: ArchiveItem) {
  return isTaskCompleted(task) && moment(task.status.updated).get('hour')
}

export function isTaskCompletedBeforeTime(
  task: ArchiveItem,
  hour: number
): boolean {
  return getTaskHour(task) < 8
}
