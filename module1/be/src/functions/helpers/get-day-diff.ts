import moment from 'moment'

export function getDayDifference(startDate: string, currentDate: string) {
  return moment(currentDate).diff(moment(startDate), 'days')
}
