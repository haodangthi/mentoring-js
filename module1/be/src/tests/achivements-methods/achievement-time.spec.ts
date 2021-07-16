import { ArchiveItem } from '../../models'
import { State } from '../../models/enums/state'
import {
  getTaskHour,
  isTaskCompletedBeforeTime,
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

describe('Check what time the tasks were completed', () => {
  it('should return hour of task\'s completion', () => {
    expect(getTaskHour(tasks[0])).toBe(17)
  })

  it('should check if the task is completed before 8 am', () => {
    expect(isTaskCompletedBeforeTime(tasks[0], 8)).toBe(false)
    expect(isTaskCompletedBeforeTime(tasks[1], 8)).toBe(true)
  })
})
