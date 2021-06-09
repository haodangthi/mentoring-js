import { ArchiveItem } from '../../models'
import { State } from '../../models/enums/state'
import { getCompletedInRow } from '../../functions/achievementCheckMethods'

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

describe('Check if the tasks were completed 7 days straight', () => {
  it('should', () => {
    // expect(getCompletedInRow()).toBe(true)
  })

  it('should get all tasks and map into state strings, join them with a comma and return a long string', () => {
    // expect(getCompletedInRow()).toBe(true)
  })

  it('should split a string by a separator Failure', () => {
    // expect(getCompletedInRow()).toBe(true)
  })

  // check the difference between tasks is <= 1
})
