import { ArchiveItem } from '../../../be/src/models'
enum State {
  Pending = 'Pending',
  Success = 'Success',
  Failure = 'Failure',
}

export function updateTask(task: ArchiveItem, completed: boolean): ArchiveItem {
  return {
    ...task,
    status: {
      updated: new Date().toISOString(),
      state: completed ? State.Success : State.Failure,
    },
  }
}
