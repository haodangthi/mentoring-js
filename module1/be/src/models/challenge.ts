import { State } from './enums/state'
import { Status } from './status'

export interface Challenge {
  id: string
  state: State
  tasksOrder: []
  tasksStatus: Status
  achievementsStatus: []
}
