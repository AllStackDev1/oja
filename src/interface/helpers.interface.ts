import { CountryCodes } from 'react-flags-select/build/types'
import { ICountry } from './country.interface'

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

export interface IAny<T> {
  [key: string]: T
}

export interface IDocument {
  _id: string
  createdAt: string
  updatedAt: string
}
