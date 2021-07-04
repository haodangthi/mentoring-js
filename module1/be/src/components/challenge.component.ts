import moment from 'moment'

import {
  Achievement,
  AchievementItem,
  ActualAchievement,
  ArchiveItem,
  IChallenge,
  Status,
  TaskForToday,
} from '../models'
import { State } from '../models/enums'
import Task from '../models/task'
import {
  getUpdatedAchievements,
  setAchievementsStatuses,
} from '../functions/helpers'

export class Challenge implements IChallenge {
  duration: number
  state = State.Pending
  startDate: string
  tasksOrder: Task[]
  tasksStatus: Map<string, Status> = new Map()
  archiveTasks: ArchiveItem[] = []
  achievementsStatus: Map<string, Status> = new Map()
  achievements: Achievement[]
  actualAchievements: ActualAchievement[]
  achievementsNumber: number
  currentTask: TaskForToday = {} as any

  constructor(
    tasksLists: Task[],
    achievements: AchievementItem[],
    duration = 30,
    achievementsNumber = duration / 6
  ) {
    this.duration = duration
    this.startDate = new Date().toISOString()
    this.tasksOrder = tasksLists
    this.achievements = getUpdatedAchievements(achievements)
    this.actualAchievements = setAchievementsStatuses(achievements)
    this.achievementsNumber = achievementsNumber
  }

  getLastDayOfChallenge(): string {
    return moment(this.startDate)
      .add('day', this.tasksOrder.length)
      .toISOString()
  }
}
