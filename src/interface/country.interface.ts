import { IDocument } from './helpers.interface'

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
