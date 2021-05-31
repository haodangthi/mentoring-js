import tasks from '../data/tasks.json'
import {
  ActualAchievement,
  ArchiveItem,
  Challenge,
  Status,
  TaskForToday,
} from '../models'
import Task from '../models/task'

export function getTaskForToday(challengeId: string): TaskForToday {
  return {} as TaskForToday
}

export function getActualAchievements(
  challengeId: string
): ActualAchievement[] {
  return [] as ActualAchievement[]
}
export function getTaskArchive(challengeId: string): ArchiveItem[] {
  return [] as ArchiveItem[]
}

export function startNewChallenge(
  tasksList: Task[],
  challengesList: string[],
  challengeDuration = 30,
  achievementsNumber = challengeDuration / 6
): Challenge {
  return {} as Challenge
}

export function calculateAchievementsStatus(
  achievementsList: ActualAchievement[]
): Status {
  return {} as Status
}
