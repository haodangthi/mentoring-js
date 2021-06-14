import { getCheckMethod, getUpdatedAchievements } from '../../functions/helpers'
import { getCompletedInRow } from '../../functions/achievementCheckMethods'

import * as achievements from '../../data/achievements.json'

describe('Adding check methods to each achievement', () => {
  it('getCheckMethod should return an achievement with a check method name', () => {
    const updatedAchievement = getCheckMethod(achievements[0])
    expect(updatedAchievement.checkComplete).toBe(getCompletedInRow)
  })

  it('should add check methods to all the achievements, achievement should contain a checkComplete function', () => {
    const achievementsUpdated = getUpdatedAchievements(achievements)

    achievementsUpdated.forEach((achievement) => {
      expect(typeof achievement.checkComplete).toBe('function')
    })
  })
})
