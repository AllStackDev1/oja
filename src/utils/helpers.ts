/* eslint-disable @typescript-eslint/no-explicit-any */
import _ from 'lodash'
import moment from 'moment'

export const getFormattedDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}

export const upperFirst = (str: string): string => _.upperFirst(str)

export const getSentence = (str: string): string => {
  const x = str.replace(/([A-Z])/g, ' $1')
  console.log(x)
  return x.replace(/^./, function (str) {
    return str.toLowerCase()
  })
}

export const sec2min = (secs: number): string =>
  moment.utc(secs * 1000).format('mm:ss')

export const formatMoney = (
  amount: number | string,
  decimalCount = 2,
  decimal = '.',
  thousands = ','
): string => {
  decimalCount = Math.abs(decimalCount)
  decimalCount = isNaN(decimalCount) ? 2 : decimalCount
  const negativeSign = amount < 0 ? '-' : ''
  const i = parseInt(
    (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))
  ).toString()
  const j = i.length > 3 ? i.length % 3 : 0

  return (
    negativeSign +
    (j ? i.substr(0, j) + thousands : '') +
    i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands) +
    (decimalCount
      ? decimal +
        Math.abs(Number(amount) - Number(i))
          .toFixed(decimalCount)
          .slice(2)
      : '')
  )
}
