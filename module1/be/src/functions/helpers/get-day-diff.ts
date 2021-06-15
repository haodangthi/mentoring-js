import * as moment from 'moment'

export function getDayDifference(startDate: any, currentDate: any) {
  return moment(currentDate).diff(moment(startDate), 'days')
}
