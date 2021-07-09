import _ from 'lodash'
import moment from 'moment'
import { IPhoneInputData } from 'interface/helpers.interface'

export const getFormattedDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}

export const phoneInputData = (): IPhoneInputData => {
  const data: Record<string, Record<string, string>> = {
    NG: {
      dialCode: '+234',
      currency: 'NGR',
      name: 'Nigeria',
      placeholder: '80 3100 0030'
    },
    US: {
      dialCode: '+1',
      currency: 'USD',
      name: 'United States',
      placeholder: '(201) 555-0123'
    },
    GB: {
      dialCode: '+44',
      placeholder: '7400 123456',
      name: 'Great Britain',
      currency: 'GBP'
    },
    GH: {
      dialCode: '+233',
      name: 'Ghana',
      currency: 'GHS',
      placeholder: '23 7280 716'
    }
  }

  const countries = Object.keys(data)

  const customLabels: Record<string, string> = Object.assign(
    {},
    ...countries.map(c => JSON.parse(JSON.stringify({ [c]: data[c].currency })))
  )

  return { countries, customLabels, data }
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
