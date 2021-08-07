/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormikHelpers } from 'formik'

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

export interface IFormikSubmitHandler<T> {
  values: T
  actions: FormikHelpers<T>
}

export interface IBank {
  name: string
  code: number | string
}
