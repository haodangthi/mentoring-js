import { ArchiveItem } from '../../models'
import * as moment from 'moment'
import { isTaskCompleted } from './achievements-quantity'

export function getTasksCompletedOnWeekday(
  tasks: ArchiveItem[],
  quantity: number,
  day: string
): boolean {
  return (
    tasks.filter((task) => isTaskCompletedInDay(task, day)).length >= quantity
  )
}

export function isTaskCompletedInDay(task: ArchiveItem, day: string): boolean {
  return isTaskCompleted(task) && getWeekday(task.status.updated) === day
}

export function getWeekday(date: string): string {
  return moment(date).format('dddd')
}
