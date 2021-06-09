import { ArchiveItem } from '../../models'
import { State } from '../../models/enums/state'
import {
  areTasksCompleted,
  isTaskCompleted,
} from '../../functions/achievementCheckMethods'

const tasks: ArchiveItem[] = [
  {
    id: '1',
    description:
      'Pick up at least ten stuff you dont use and donate sell recycle them',
    status: {
      state: State.Success,
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

describe('Check how many tasks are completed', () => {
  it('should check whether all tasks are completed', () => {
    expect(areTasksCompleted(tasks, tasks.length)).toBe(true)
  })

  it('should check whether some amount of the tasks are completed', () => {
    expect(areTasksCompleted(tasks, tasks.length / 2)).toBe(true)
  })

  it('should check whether a task is completed', () => {
    const task = tasks[0]
    expect(isTaskCompleted(task)).toBe(true)
  })
})
