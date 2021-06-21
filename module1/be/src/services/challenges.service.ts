import { Challenge } from '../components'
import { getById } from '../functions/helpers'
import {
  getActualAchievements,
  getTaskArchive,
  getTaskForToday,
} from '../functions/methods'
import { ActualAchievement, ArchiveItem, Status, TaskForToday } from '../models'

export class ChallengesService {
  allChallenges: Challenge[]

  constructor() {
    this.allChallenges = []
  }

  addNewChallenge(challenge: Challenge) {
    this.allChallenges.push(challenge)
  }

  getChallengeByChallengeId(challengeId: string): Challenge {
    return getById(challengeId, this.allChallenges)
  }

  getActualAchievementsByChallengeId(challengeId: string): ActualAchievement[] {
    return getActualAchievements(challengeId, this.allChallenges)
  }

  getTaskForTodayByChallengeId(challengeId: string): TaskForToday {
    return getTaskForToday(challengeId, this.allChallenges)
  }

  getTaskArchiveByChallengeId(challengeId: string): ArchiveItem[] {
    return getTaskArchive(challengeId, this.allChallenges)
  }

  completeTodayTask(
    challengeId: string,
    task: TaskForToday
  ): Map<string, Status> {
    const challenge = this.getChallengeByChallengeId(challengeId)
    challenge.addTaskToArchive(task)
    return challenge.calculateAchievementStatus()
  }
}

const challengeService = new ChallengesService()
export default challengeService
