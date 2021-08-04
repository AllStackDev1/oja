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
  return x.replace(/^./, function (str) {
    return str.toLowerCase()
  })
}

export const sec2min = (secs: number): string =>
  moment.utc(secs * 1000).format('mm:ss')

export const formatMoney = (amount: number, currency = 'USD'): string => {
  const options = {
    maximumFractionDigits: 2,
    currency: currency,
    style: 'currency',
    currencyDisplay: 'symbol'
  }

  const type = currency === 'NGN' ? 'en-NG' : 'en-US'

  return amount.toLocaleString(type, options)
}
