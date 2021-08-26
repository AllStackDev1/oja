import { IDocument } from './helpers.interface'

export interface IRate extends Document {
  currency: ICurrency
  value: { $numberDecimal: string }
}

export interface ICurrency extends IDocument {
  name: string
  code: string
  flag: string
  symbol: string
  rates: IRate[]
  status: boolean
}
