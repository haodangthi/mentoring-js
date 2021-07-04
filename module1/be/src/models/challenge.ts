import { State } from './enums/state'
import { Status } from './status'
import { ActualAchievement } from './actual-achievment'
import { ArchiveItem } from './archive-item'
import Task from './task'
import { Achievement } from './achievement'
import { TaskForToday } from './task-for-day'

export type TaskStatus = Partial<ArchiveItem>

export interface IChallenge {
  id?: string
  duration?: number
  state?: State
  startDate?: string
  currentTask: TaskForToday
  tasksOrder?: Task[]
  tasksStatus?: Map<string, Status>
  archiveTasks?: ArchiveItem[] | []
  achievementsStatus?: Map<string, Status>
  achievements?: Achievement[]
  actualAchievements?: ActualAchievement[]
}
