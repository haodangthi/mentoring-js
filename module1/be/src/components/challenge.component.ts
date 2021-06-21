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
import {
  calculateAchievementsStatus,
  calculateTaskForToday,
} from '../functions/methods'
import schedule from 'node-schedule'
import { isTaskCompleted } from '../functions/achievementCheckMethods'
import { updateAllAchievementStatuses } from '../functions/helpers/update-actual-achievement'

export class Challenge implements IChallenge {
  id: string
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
  currentDayTask: TaskForToday = {} as any

  constructor(
    tasksLists: Task[],
    achievements: AchievementItem[],
    duration = 30,
    achievementsNumber = duration / 6
  ) {
    this.id = new Date().getTime().toString()
    this.duration = duration
    this.startDate = new Date().toISOString()
    this.tasksOrder = tasksLists
    this.achievements = getUpdatedAchievements(achievements)
    this.actualAchievements = setAchievementsStatuses(achievements)
    this.achievementsNumber = achievementsNumber

    this.setSchedule()
    this.setTaskForToday(calculateTaskForToday(this))
  }

  getLastDayOfChallenge(): string {
    return moment(this.startDate)
      .add('day', this.tasksOrder.length)
      .toISOString()
  }

  addTaskToArchive(task: ArchiveItem): void {
    this.archiveTasks.push(task)
  }

  calculateAchievementStatus(): Map<string, Status> {
    this.actualAchievements = updateAllAchievementStatuses(
      this.actualAchievements,
      this.archiveTasks,
      this.achievements
    )
    this.achievementsStatus = calculateAchievementsStatus(
      this.actualAchievements
    )
    return this.achievementsStatus
  }

  setSchedule(): void {
    schedule.scheduleJob('0 12 * * *', () => {
      this.finishTodayTask()
      this.setTaskForToday(calculateTaskForToday(this))
      this.calculateAchievementStatus()
    })
  }

  completeTodayTask(task: TaskForToday): void {
    this.currentDayTask = task
    this.addTaskToArchive(this.currentDayTask)
  }

  finishTodayTask(): void {
    if (this.currentDayTask && !isTaskCompleted(this.currentDayTask)) {
      const failedTask = this.updateTask(this.currentDayTask, false)
      this.addTaskToArchive(failedTask)
    }
  }

  setTaskForToday(task: TaskForToday): void {
    this.currentDayTask = task
  }

  updateTask(task: ArchiveItem, completed: boolean): ArchiveItem {
    return {
      ...task,
      status: {
        updated: new Date().toISOString(),
        state: completed ? State.Success : State.Failure,
      },
    }
  }
}
