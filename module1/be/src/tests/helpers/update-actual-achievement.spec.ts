import { ActualAchievement, ArchiveItem } from '../../models'
import { State } from '../../models/enums'
import {
  findCheckMethod,
  setActualAchievementStatus,
  updateAchievementStatus,
  updateAllAchievementStatuses,
} from '../../functions/helpers/update-actual-achievement'
import { getUpdatedAchievements } from '../../functions/helpers'
import * as achievements from '../../data/achievements.json'

const tasks: ArchiveItem[] = [
  {
    id: '1',
    description:
      'Pick up at least ten stuff you dont use and donate sell recycle them',
    status: {
      state: State.Success,
      updated: '2021-06-20T07:28:20.462Z',
    },
  },
  {
    id: '2',
    description:
      'Find a song you liked In adolescence and sing it like in karaoke',
    status: {
      state: State.Success,
      updated: '2021-06-20T04:28:20.462Z',
    },
  },
]

const tasksBefore8: ArchiveItem[] = [
  {
    id: '1',
    description:
      'Pick up at least ten stuff you dont use and donate sell recycle them',
    status: {
      state: State.Success,
      updated: '2021-06-20T03:28:20.462Z',
    },
  },
  {
    id: '2',
    description:
      'Find a song you liked In adolescence and sing it like in karaoke',
    status: {
      state: State.Success,
      updated: '2021-06-20T04:28:20.462Z',
    },
  },
  {
    id: '1',
    description:
      'Pick up at least ten stuff you dont use and donate sell recycle them',
    status: {
      state: State.Success,
      updated: '2021-06-20T03:28:20.462Z',
    },
  },
  {
    id: '2',
    description:
      'Find a song you liked In adolescence and sing it like in karaoke',
    status: {
      state: State.Success,
      updated: '2021-06-20T04:28:20.462Z',
    },
  },
  {
    id: '1',
    description:
      'Pick up at least ten stuff you dont use and donate sell recycle them',
    status: {
      state: State.Success,
      updated: '2021-06-20T03:28:20.462Z',
    },
  },
  {
    id: '2',
    description:
      'Find a song you liked In adolescence and sing it like in karaoke',
    status: {
      state: State.Success,
      updated: '2021-06-20T04:28:20.462Z',
    },
  },
]

const achievementsItems = getUpdatedAchievements((achievements as any).default)

const achievement: ActualAchievement = {
  id: '2',
  description: 'Complete five tasks before 8:00 AM',
  status: {
    state: State.Pending,
    updated: '2021-06-20T4:28:20.462Z',
  },
}

const actualAchievements: ActualAchievement[] = [
  {
    id: '1',
    description: 'Complete each task 7 days in a row',
    status: {
      state: State.Pending,
      updated: 'date2',
    },
  },
  {
    id: '2',
    description: 'Complete five tasks before 8:00 AM',
    status: {
      state: State.Pending,
      updated: 'date1',
    },
  },
]

describe('Update actual achievement status', () => {
  it('should set achievement status state to success', () => {
    const updatedAchievement = updateAchievementStatus(achievement, true)
    expect(updatedAchievement.status.state).toBe(State.Success)
  })

  it('should find check Method by id', () => {
    const checkMethod = findCheckMethod(achievement.id, achievementsItems)

    expect(checkMethod(tasksBefore8)).toBe(true)
  })

  it('should set achievement according to the check', () => {
    const checkMethod = findCheckMethod(achievement.id, achievementsItems)
    const updatedActualAchievement = setActualAchievementStatus(
      tasks,
      achievement,
      checkMethod
    )
    const updatedActualAchievement2 = setActualAchievementStatus(
      tasksBefore8,
      achievement,
      checkMethod
    )
    expect(updatedActualAchievement.status.state).toBe(State.Failure)
    expect(updatedActualAchievement2.status.state).toBe(State.Success)
  })

  it('should update all achievements', () => {
    const allAchievements = updateAllAchievementStatuses(
      actualAchievements,
      tasksBefore8,
      achievementsItems
    )
    expect(allAchievements[0].status.state).toBe(State.Failure)
    expect(allAchievements[1].status.state).toBe(State.Success)
  })
})
