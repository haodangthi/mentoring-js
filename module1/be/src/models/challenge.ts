import { State } from './enums/state'
import { Status } from './status'
import { ActualAchievement } from './actual-achievment'
import { ArchiveItem } from './archive-item'
import Task from './task'
import { Achievement } from './achievement'

export type TaskStatus = Partial<ArchiveItem>

export interface IChallenge {
  id: string
  duration?: number
  state?: State
  startDate?: any
  currentTasks?: ArchiveItem[]
  tasksOrder?: Task[]
  tasksStatus?: Map<string, Status>
  archiveTasks?: ArchiveItem[] | []
  achievementsStatus?: Map<string, Status>
  achievements?: Achievement[]
  actualAchievements?: ActualAchievement[]
}
