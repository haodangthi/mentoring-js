import { Status } from './status'
import Task from './task'

export interface Achievement extends Task {
  icon: string
  checkComplete(taskStatus: Status): Status
}
