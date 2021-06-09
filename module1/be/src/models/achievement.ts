import { Status } from './status'
import Task from './task'

export interface Achievement extends Task {
  icon: string
  checkComplete(taskStatus: Status): Status
}

const achievement1: Achievement = {
  id: '1',
  description: '',
  icon: '',
  checkComplete(taskStatus: Status): Status {
    return {} as Status
  },
}
