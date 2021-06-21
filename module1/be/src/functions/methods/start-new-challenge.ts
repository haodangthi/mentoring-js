import { Challenge } from '../../components'

export function startNewChallenge(
  tasksList: any[],
  achievements: any[],
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
