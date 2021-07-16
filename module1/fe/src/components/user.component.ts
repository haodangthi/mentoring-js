import {
  ActualAchievement,
  ArchiveItem,
  TaskForToday,
} from '../../../be/src/models'
import { SERVER_URL, token } from '../constants'

export class UserComponent {
  user: any
  activeChallengeId: string
  todayTask: TaskForToday
  actualAchievements: ActualAchievement[]

  constructor() {
    this.getUser()
  }

  getUser(): void {
    fetch(`${SERVER_URL}/user/active-challenge`, {
      method: 'get',
      headers: new Headers({
        Authorization: `Bearer ${token}`,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        this.user = user
      })
  }

  startNewChallenge() {
    return fetch(`${SERVER_URL}/start-new-challenge`, {
      method: 'get',
      headers: new Headers({
        Authorization: `Bearer ${token}`,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        this.activeChallengeId = data.challengeId
        return this.activeChallengeId
      })
  }

  getTodayTask() {
    return fetch(
      `${SERVER_URL}/challenges/${this.activeChallengeId}/task-for-today`,
      {
        method: 'get',
        headers: new Headers({
          Authorization: `Bearer ${token}`,
        }),
      }
    )
      .then((response) => response.json())
      .then((task) => {
        this.todayTask = task
        return task
      })
  }
}
