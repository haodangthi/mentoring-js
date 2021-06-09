import Task from '../../models/task'
import {
  ActualAchievement,
  ArchiveItem,
  IChallenge,
  Status,
} from '../../models'
import { State } from '../../models/enums/state'

export function startNewChallenge(
  tasksList: Task[],
  achievements: ActualAchievement[],
  challengeDuration = 30,
  achievementsNumber = challengeDuration / 6
): Challenge {
  return new Challenge(
    tasksList,
    achievements,
    challengeDuration,
    achievementsNumber
  )
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
