import { ActualAchievement, Challenge, IChallenge } from '../../models'
import { getById } from '../helpers/get-by-id'

export function getActualAchievements(
  challengeId: string,
  challengeList: IChallenge[]
): ActualAchievement[] {
  return (
    getById(challengeId, challengeList).actualAchievements ||
    ([] as ActualAchievement[])
  )
}
