import { ArchiveItem } from '../../models'
import { State } from '../../models/enums/state'
import {
  getTasksCompletedOnWeekday,
  getWeekday,
  isTaskCompletedInDay,
} from '../../functions/achievementCheckMethods'

const tasks: ArchiveItem[] = [
  {
    id: '1',
    description:
      'Pick up at least ten stuff you dont use and donate sell recycle them',
    status: {
      state: State.Success,
      updated:
        'Tue Jun 08 2021 17:18:34 GMT+0300 (Eastern European Summer Time)',
    },
  },
  {
    id: '2',
    description:
      'Find a song you liked In adolescence and sing it like in karaoke',
    status: {
      state: State.Success,
      updated:
        'Tue Jun 08 2021 05:18:34 GMT+0300 (Eastern European Summer Time)',
    },
  },
]
describe('Check what day of the week a task was completed', () => {
  it('should check whether all tasks are completed', () => {
    expect(isTaskCompletedInDay(tasks[0], 'Tuesday')).toBe(true)
  })

  it('should check whether a task was completed on a chosen weekday', () => {
    expect(getWeekday(tasks[0].status.updated)).toBe('Tuesday')
  })

  it('should check whether some amount of the tasks were completed on a chosen weekday', () => {
    expect(getTasksCompletedOnWeekday(tasks, 5, 'Tuesday')).toBe(false)
    expect(getTasksCompletedOnWeekday(tasks, 2, 'Tuesday')).toBe(true)
  })
})
