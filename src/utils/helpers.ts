// import * as _ from 'lodash'

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
