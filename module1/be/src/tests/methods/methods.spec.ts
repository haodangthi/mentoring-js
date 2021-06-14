import { ActualAchievement, ArchiveItem, IChallenge } from '../../models'
import * as tasksList from '../../data/tasks.json'
import { State } from '../../models/enums/state'
import * as achievements from '../../data/achievements.json'
import {
  calculateAchievementsStatus,
  getActualAchievements,
  getTaskArchive,
  getTaskForToday,
  startNewChallenge,
} from '../../functions/methods'
import * as moment from 'moment'
import {
  getDayDifference,
  isSameDay,
} from '../../functions/helpers/calculate-order'
import Task from '../../models/task'

const tasks: ArchiveItem[] = [
  {
    id: '1',
    description:
      'Pick up at least ten stuff you dont use and donate sell recycle them',
    status: {
      state: State.Pending,
      updated: 'date1',
    },
  },
  {
    id: '2',
    description:
      'Find a song you liked In adolescence and sing it like in karaoke',
    status: {
      state: State.Success,
      updated: 'date2',
    },
  },
]

const actualAchievements: ActualAchievement[] = [
  {
    id: '1',
    description: 'Complete each task 7 days in a row',
    status: {
      state: State.Success,
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

const challengeList: IChallenge[] = [
  {
    id: '123',
    tasksOrder: tasksList as any,
    archiveTasks: [],
    actualAchievements,
  },
  {
    id: '122',
    tasksOrder: tasksList as unknown as Task[],
    archiveTasks: tasks,
    startDate: new Date(),
    achievements: achievements as any,
    actualAchievements,
  },
]

const achievementsStatus = {
  '1': {
    state: State.Success,
    updated: 'date2',
  },
  '2': {
    state: State.Pending,
    updated: 'date1',
  },
}

const newChallenge: IChallenge = {
  id: '124',
  tasksOrder: tasksList as [],
  archiveTasks: tasks,
  startDate: '',
  achievements: achievements as any,
  actualAchievements,
}

describe('test methods', () => {
  const challengeId = '122'
  it('should return a task by Challenge id', () => {
    const newTask = getTaskForToday(challengeId, challengeList)
    expect(newTask.id).toBe(tasksList[0].id)
  })

  it('calculate the order', () => {
    const index = 2
    const now = new Date()
    const tomorrow = moment(now).add(2, 'day')
    expect(getDayDifference(now, tomorrow)).toBe(index)
  })

  it('should check if the dates are same day', () => {
    expect(isSameDay(new Date(), new Date())).toBe(true)
  })

  it('should Return a list of actual achievements by the challenge id', () => {
    expect(getActualAchievements(challengeId, challengeList)).toBe(
      challengeList[0].actualAchievements
    )
  })

  it('should Return all past tasks with their results by the challenge id', () => {
    expect(getTaskArchive(challengeId, challengeList)).toBe(
      challengeList[1].archiveTasks
    )
  })

  it('should Return a new challenge using the following parameters: a list of tasks, a list of challenges', () => {
    const challenge = startNewChallenge(tasksList as any, achievements as any)

    expect(challenge.duration).toBe(30)
    expect(challenge.actualAchievements?.length).toBe(30 / 6)
    expect(challenge.state).toBe(State.Pending)
    expect(isSameDay(challenge.startDate, new Date())).toBe(true)
  })

  it('should calculate and Return achievements status for the challenge by its achievements list and tasks status', () => {
    const status = calculateAchievementsStatus(actualAchievements)

    expect(status.get('1')).toEqual(achievementsStatus['1'])
    expect(status.get('2')).toEqual(achievementsStatus['2'])
  })
})
