import { getCheckMethod, getUpdatedAchievements } from '../../functions/helpers'
import { getCompleted7DaysInRow } from '../../functions/achievementCheckMethods'

import * as achievements from '../../data/achievements-test.json'

describe('Adding check methods to each achievement', () => {
  it('getCheckMethod should return an achievement with a check method name', () => {
    const updatedAchievement = getCheckMethod((achievements as any).default[0])
    expect(updatedAchievement.checkComplete).toBe(getCompleted7DaysInRow)
  })

  it('should add check methods to all the achievements, achievement should contain a checkComplete function', () => {
    const achievementsUpdated = getUpdatedAchievements(
      (achievements as any).default
    )

    achievementsUpdated.forEach((achievement) => {
      expect(typeof achievement.checkComplete).toBe('function')
    })
  })
})
