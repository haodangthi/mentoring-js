import moment from 'moment'

export function isSameDay(firstDate: string, secondDate: string) {
  return moment(firstDate).isSame(moment(secondDate), 'day')
}
