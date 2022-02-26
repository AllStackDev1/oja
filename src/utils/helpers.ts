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

export const localStringToNumber = (s: string | number): number => {
  return Number(String(s).replace(/[^0-9.-]+/g, ''))
}

export const fetchData = async (
  path: string,
  config: Record<string, any> = {}
): Promise<any> => {
  const response = await fetch(path, config)
  return await response.json()
}

const pkBankAPI = 'https://api.paystack.co/bank'

export const getNigerianBanks = async (): Promise<Record<string, any>> => {
  return await fetchData(`${pkBankAPI}?country=nigeria`, {
    headers: {
      Authorization: 'Bearer sk_test_d87d4e2620ae1928de81cfbe385a65838f9bcdf0'
    }
  })
}

export const validateNigerianAccount = async (
  accNo: string,
  bkCode: string | number
): Promise<Record<string, any>> => {
  return await fetchData(
    `${pkBankAPI}/resolve?account_number=${accNo}&bank_code=${bkCode}`,
    {
      headers: {
        Authorization: 'Bearer sk_test_d87d4e2620ae1928de81cfbe385a65838f9bcdf0'
      }
    }
  )
}
