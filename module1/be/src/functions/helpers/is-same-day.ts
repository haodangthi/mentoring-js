import * as moment from 'moment'

export function isSameDay(date1: any, date2: any) {
  return moment(date1).isSame(moment(date2), 'day')
}
