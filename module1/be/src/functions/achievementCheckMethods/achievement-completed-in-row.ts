import { ArchiveItem } from '../../models'
import { isTaskCompleted } from './achievements-quantity'
import { getDayDifference } from '../helpers'

export function getCompletedInRow(
  tasks: ArchiveItem[],
  daysNumber: number
): boolean {
  if (tasks.length < daysNumber) return false
  let counter = 0
  tasks.every((task, index) => {
    if (counter >= daysNumber) return false
    twoTasksCompletedInRow(task, tasks[index + 1]) ? counter++ : (counter = 0)

    return true
  })

  return counter >= daysNumber
}

export function twoTasksCompletedInRow(
  currentTask: ArchiveItem,
  nextTask: ArchiveItem
): boolean {
  return (
    isTaskCompleted(currentTask) &&
    isTaskCompleted(nextTask) &&
    getDayDifference(currentTask.status.updated, nextTask.status.updated) <= 1
  )
}

export function getCompleted7DaysInRow(tasks: ArchiveItem[]): boolean {
  return getCompletedInRow(tasks, 7)
}
