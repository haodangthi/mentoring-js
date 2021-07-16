import { ArchiveItem } from '../../models'
import { State } from '../../models/enums/state'
import {
  getCompletedInRow,
  twoTasksCompletedInRow,
} from '../../functions/achievementCheckMethods'

const tasks: ArchiveItem[] = [
  {
    id: '1',
    description:
      'Pick up at least ten stuff you dont use and donate sell recycle them',
    status: {
      state: State.Success,
      updated:
        'Mon Jun 14 2021 21:31:06 GMT+0300 (Eastern European Summer Time)',
    },
  },
  {
    id: '2',
    description:
      'Find a song you liked In adolescence and sing it like in karaoke',
    status: {
      state: State.Success,
      updated:
        'Tue Jun 15 2021 21:31:06 GMT+0300 (Eastern European Summer Time)',
    },
  },
  {
    id: '3',
    description:
      'Find a song you liked In adolescence and sing it like in karaoke',
    status: {
      state: State.Failure,
      updated:
        'Tue Jun 15 2021 21:31:06 GMT+0300 (Eastern European Summer Time)',
    },
  },
]

const tasksArray: ArchiveItem[] = [
  {
    id: '1',
    description:
      'Pick up at least ten stuff you dont use and donate sell recycle them',
    status: {
      state: State.Success,
      updated:
        'Mon Jun 14 2021 21:31:06 GMT+0300 (Eastern European Summer Time)',
    },
  },
  {
    id: '2',
    description:
      'Find a song you liked In adolescence and sing it like in karaoke',
    status: {
      state: State.Success,
      updated:
        'Tue Jun 15 2021 21:31:06 GMT+0300 (Eastern European Summer Time)',
    },
  },
  {
    id: '3',
    description:
      'Find a song you liked In adolescence and sing it like in karaoke',
    status: {
      state: State.Success,
      updated:
        'Wed Jun 16 2021 21:31:06 GMT+0300 (Eastern European Summer Time)',
    },
  },
  {
    id: '1',
    description:
      'Pick up at least ten stuff you dont use and donate sell recycle them',
    status: {
      state: State.Success,
      updated:
        'Thu Jun 17 2021 21:31:06 GMT+0300 (Eastern European Summer Time)',
    },
  },
  {
    id: '2',
    description:
      'Find a song you liked In adolescence and sing it like in karaoke',
    status: {
      state: State.Success,
      updated:
        'Fri Jun 18 2021 21:31:06 GMT+0300 (Eastern European Summer Time)',
    },
  },
  {
    id: '3',
    description:
      'Find a song you liked In adolescence and sing it like in karaoke',
    status: {
      state: State.Success,
      updated:
        'Sat Jun 19 2021 21:31:06 GMT+0300 (Eastern European Summer Time)',
    },
  },
  {
    id: '1',
    description:
      'Pick up at least ten stuff you dont use and donate sell recycle them',
    status: {
      state: State.Success,
      updated:
        'Sun Jun 20 2021 21:31:06 GMT+0300 (Eastern European Summer Time)',
    },
  },
  {
    id: '2',
    description:
      'Find a song you liked In adolescence and sing it like in karaoke',
    status: {
      state: State.Success,
      updated:
        'Mon Jun 21 2021 21:31:06 GMT+0300 (Eastern European Summer Time)',
    },
  },
  {
    id: '3',
    description:
      'Find a song you liked In adolescence and sing it like in karaoke',
    status: {
      state: State.Failure,
      updated:
        'Tue Jun 22 2021 21:31:06 GMT+0300 (Eastern European Summer Time)',
    },
  },
]
const tasksArray2: ArchiveItem[] = [
  {
    id: '1',
    description:
      'Pick up at least ten stuff you dont use and donate sell recycle them',
    status: {
      state: State.Success,
      updated:
        'Mon Jun 14 2021 21:31:06 GMT+0300 (Eastern European Summer Time)',
    },
  },
  {
    id: '2',
    description:
      'Find a song you liked In adolescence and sing it like in karaoke',
    status: {
      state: State.Success,
      updated:
        'Tue Jun 15 2021 21:31:06 GMT+0300 (Eastern European Summer Time)',
    },
  },
  {
    id: '3',
    description:
      'Find a song you liked In adolescence and sing it like in karaoke',
    status: {
      state: State.Failure,
      updated:
        'Wed Jun 16 2021 21:31:06 GMT+0300 (Eastern European Summer Time)',
    },
  },
  {
    id: '1',
    description:
      'Pick up at least ten stuff you dont use and donate sell recycle them',
    status: {
      state: State.Success,
      updated:
        'Thu Jun 17 2021 21:31:06 GMT+0300 (Eastern European Summer Time)',
    },
  },
  {
    id: '2',
    description:
      'Find a song you liked In adolescence and sing it like in karaoke',
    status: {
      state: State.Success,
      updated:
        'Fri Jun 18 2021 21:31:06 GMT+0300 (Eastern European Summer Time)',
    },
  },
  {
    id: '3',
    description:
      'Find a song you liked In adolescence and sing it like in karaoke',
    status: {
      state: State.Success,
      updated:
        'Sat Jun 19 2021 21:31:06 GMT+0300 (Eastern European Summer Time)',
    },
  },
  {
    id: '1',
    description:
      'Pick up at least ten stuff you dont use and donate sell recycle them',
    status: {
      state: State.Success,
      updated:
        'Sun Jun 20 2021 21:31:06 GMT+0300 (Eastern European Summer Time)',
    },
  },
  {
    id: '2',
    description:
      'Find a song you liked In adolescence and sing it like in karaoke',
    status: {
      state: State.Success,
      updated:
        'Mon Jun 21 2021 21:31:06 GMT+0300 (Eastern European Summer Time)',
    },
  },
  {
    id: '3',
    description:
      'Find a song you liked In adolescence and sing it like in karaoke',
    status: {
      state: State.Failure,
      updated:
        'Tue Jun 22 2021 21:31:06 GMT+0300 (Eastern European Summer Time)',
    },
  },
]

describe('Check if the tasks were completed 7 days straight', () => {
  it('should return false if tasks length is less than days number', () => {
    expect(getCompletedInRow(tasks, 7)).toBe(false)
  })

  it('should return true if the tasks are completed in a row', () => {
    expect(getCompletedInRow(tasksArray, 7)).toBe(true)
  })

  it('should return false if the tasks are not completed in a row', () => {
    expect(getCompletedInRow(tasksArray2, 7)).toBe(false)
  })

  it('should return false if tasks length is 0', () => {
    expect(getCompletedInRow([], 7)).toBe(false)
  })

  it('should check if two tasks were completed in a row', () => {
    expect(twoTasksCompletedInRow(tasks[0], tasks[1])).toBe(true)
    expect(twoTasksCompletedInRow(tasks[1], tasks[2])).toBe(false)
  })
})
