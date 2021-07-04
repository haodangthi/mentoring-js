import { Challenge } from '../../components'
import { IChallenge } from '../../models'

export function startNewChallenge(
  tasksList: any[],
  achievements: any[],
  challengeDuration = 30,
  achievementsNumber = challengeDuration / 6
): IChallenge {
  return new Challenge(
    tasksList,
    achievements,
    challengeDuration,
    achievementsNumber
  )
}
