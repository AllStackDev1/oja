import { IDocument } from './helpers.interface'

export interface IAddress {
  street?: string
  city?: string
  state?: string
  country: string
}

export interface IRegisterResponse {
  user: IUser
  otpResponse?: Record<string, string>
}

export interface VerifyOtpPayloadDto {
  code: string
  to?: string
  pinId?: string
}

export interface VerifyOtpStatus {
  success: boolean
  message: string
  user?: IUser
  authToken?: string
}

export interface ResendOtpPayloadDto {
  phoneNumber: string
}

export interface ResendOtpResponse {
  success: boolean
  message: Record<string, Record<string, string>>
}

export type UpdateIUser = IUser

export interface ILogin {
  email: string
  password: string
}

export interface IUser extends IDocument {
  email: string
  status: string
  avatar?: string
  lastName: string
  username: string
  password: string
  address: IAddress
  firstName: string
  dateOfBirth: Date
  phoneNumber: string
  isEmailVerified: boolean
}
