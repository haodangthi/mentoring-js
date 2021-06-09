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

export class Challenge implements IChallenge {
  id = ''
  duration: number
  state = State.Pending
  startDate: string | Date
  tasksOrder: Task[]
  tasksStatus: Map<string, Status> = new Map()
  archiveTasks: ArchiveItem[] = []
  achievementsStatus: Map<string, Status> = new Map()
  actualAchievements: ActualAchievement[]
  achievementsNumber: number

  constructor(
    tasksLists: Task[],
    actualAchievements: ActualAchievement[],
    duration = 30,
    achievementsNumber = duration / 6
  ) {
    this.duration = duration
    this.startDate = new Date()
    this.tasksOrder = tasksLists
    this.actualAchievements = actualAchievements
    this.achievementsNumber = achievementsNumber
  }
}
