import { CountryCodes } from 'react-flags-select/build/types'

export interface IPhoneInputData {
  countries?: CountryCodes
  customLabels?: Record<string, string>
  data: Record<string, ICountry>
}

export interface ResponsePayload<T, X> {
  success?: boolean
  message?: X
  data?: T
}

export interface IAny {
  [key: string]: string
}

interface IDocument {
  _id: string
  createdAt: string
  updatedAt: string
}

export interface IRate extends Document {
  name: string
  rate: { $numberDecimal: string }
}

export interface ICurrency {
  name: string
  code: string
  symbol: string
}

export interface IPhone {
  code: string
  placeholder: string
}

export interface ICountry extends IDocument {
  name: string
  code: string
  phone: IPhone
  rates: IRate[]
  status: boolean
  currency: ICurrency
}

export interface IAccountDetails {
  currency: string
  bankName: string
  swiftCode: string
  accountName: string
  accountNumber: string
  amount: { $numberDecimal: string }
}

export interface IDeal extends Document {
  user: string
  debitDetails: IAccountDetails
  creditDetails: IAccountDetails
  rate: { $numberDecimal: string }
  transactionFee: { $numberDecimal: string }
  settlementFee: { $numberDecimal: string }
}
