import {
  ActualAchievement,
  ArchiveItem,
  IChallenge,
  TaskForToday,
} from '../../models'
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
import moment from 'moment'
import { isSameDay } from '../../functions/helpers/is-same-day'
import Task from '../../models/task'
import { getDayDifference } from '../../functions/helpers'
import { getChallengeFromDatabaseById } from '../../functions/database-methods/challenge'
import { Challenge } from '../../schemas/challenge'

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
    currentTask: {} as TaskForToday,
  },
  {
    id: '122',
    tasksOrder: tasksList as unknown as Task[],
    archiveTasks: tasks,
    startDate: '2021-06-19T08:59:06.798Z',
    achievements: achievements as any,
    actualAchievements,
    state: State.Pending,
    currentTask: {} as TaskForToday,
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
  duration: 30,
  archiveTasks: tasks,
  startDate: '2021-06-19T08:59:06.798Z',
  achievements: achievements as any,
  actualAchievements,
  state: State.Pending,
  currentTask: {} as TaskForToday,
}

describe('test methods', () => {
  beforeAll(() => {
    jest.useFakeTimers('modern')
    jest.setSystemTime(new Date('2021-06-21T08:59:06.798Z'))
    Challenge.findById = jest
      .fn()
      .mockResolvedValue(Promise.resolve(challengeList[1]))
  })

  afterAll(() => {
    jest.useRealTimers()
  })

  const challengeId = '122'
  it('should return a task by Challenge id', async () => {
    const newTask = await getTaskForToday(challengeId)

    expect(newTask.id).toBe(tasksList[2].id)
  })

  it('calculate the order', () => {
    const index = 2
    const now = '2021-06-19T08:59:06.798Z'
    const tomorrow = moment(now).add(2, 'day')
    expect(getDayDifference(now, tomorrow as any)).toBe(index)
  })

  it('should check if the dates are same day', () => {
    const date1 = '2021-06-19T08:59:06.798Z'
    const date2 = '2021-06-19T08:20:06.798Z'
    expect(isSameDay(date1, date2)).toBe(true)
  })

  it('should Return a list of actual achievements by the challenge id', async () => {
    const actualAchievements = await getActualAchievements(challengeId)
    expect(actualAchievements).toBe(challengeList[1].actualAchievements)
  })

  it('should Return all past tasks with their results by the challenge id', async () => {
    const taskArchive = await getTaskArchive(challengeId)

    expect(taskArchive).toBe(challengeList[1].archiveTasks)
  })

  it('should Return a new challenge using the following parameters: a list of tasks, a list of challenges', () => {
    const challenge = startNewChallenge(
      tasksList as any,
      (achievements as any).default
    )

    expect(challenge.duration).toBe(30)
    expect(challenge.actualAchievements?.length).toBe(
      (achievements as any).default.length
    )
    expect(challenge.state).toBe(State.Pending)
    expect(
      isSameDay(challenge.startDate as any, '2021-06-21T08:59:06.798Z')
    ).toBe(true)
  })

  it('should calculate and Return achievements status for the challenge by its achievements list and tasks status', () => {
    const status = calculateAchievementsStatus(actualAchievements)

    expect(status.get('1')).toEqual(achievementsStatus['1'])
    expect(status.get('2')).toEqual(achievementsStatus['2'])
  })
})
