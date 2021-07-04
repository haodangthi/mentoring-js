import {
  ActualAchievement,
  ArchiveItem,
  TaskForToday,
} from '../../../be/src/models'
import { SERVER_URL, token } from '../../../be/src/secret/constants'

export class UserComponent {
  user: any
  activeChallengeId: string
  todayTask: TaskForToday
  taskArchive: ArchiveItem[]
  actualAchievements: ActualAchievement[]

  constructor() {
    this.getUser()
  }

  getUser(): void {
    fetch(
      `${SERVER_URL}/user/active-challenge?` +
        new URLSearchParams({
          secret_token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYwZTFiMmY0MGNhNTU1MmFmNzU2OTM5MCJ9LCJpYXQiOjE2MjU0MTk4OTl9.T0qdYbZ8rP7UlrEl2gqEfMYJ_a8tDdT-ggROEW7kMTI',
        }),
      {
        method: 'get',
        headers: new Headers({
          Authorization: `Bearer ${token}`,
        }),
      }
    )
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
