import moment from 'moment'

export function isSameDay(date1: string, date2: string) {
  return moment(date1).isSame(moment(date2), 'day')
}
