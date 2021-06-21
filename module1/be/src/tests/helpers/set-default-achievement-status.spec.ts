import {
  setAchievementsStatuses,
  setDefaultAchievementStatus,
} from '../../functions/helpers'
import { State } from '../../models/enums/state'
import { AchievementItem, Status } from '../../models'

const achievement: AchievementItem = {
  id: '1',
  description: 'Complete each task 7 days in a row',
  checkMethod: 'getCompletedInRow',
}

const achievementsList: AchievementItem[] = [
  {
    id: '2',
    description: 'Complete five tasks before 8:00 AM',
    checkMethod: 'isTaskCompletedBeforeTime',
  },
  achievement,
]

const defaultStatus: Status = {
  state: State.Pending,
  updated: '',
}

describe('Set default achievement method', () => {
  it('should add status to an achievement object', () => {
    const actualAchievement = setDefaultAchievementStatus(achievement)
    expect(actualAchievement.status.state).toBe(defaultStatus.state)
  })

  it('should add status to achievements and return actual achievement', () => {
    const actualAchievements = setAchievementsStatuses(achievementsList)

    actualAchievements.forEach((achievement) => {
      expect(achievement.status.state).toBe(defaultStatus.state)
    })
  })
})
