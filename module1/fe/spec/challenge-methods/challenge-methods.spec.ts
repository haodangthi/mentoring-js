import { updateTask } from '../../src/challenge-methods/update-task'
import { State } from '../../../be/src/models/enums'

describe('test add function', () => {
  it('should complete a task', () => {
    const task = {
      id: '1',
      description:
        'Pick up at least ten stuff you dont use and donate sell recycle them',
      status: { state: State.Pending, updated: '2021-06-19T09:59:08.584Z' },
    }
    const completedTask = updateTask(task, true)
    expect(completedTask.status.state).toBe(State.Success)
  })
})
