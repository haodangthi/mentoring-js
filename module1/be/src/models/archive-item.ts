import Task from './task'
import { Status } from './status'

export interface ArchiveItem extends Task {
  status: Status
}
