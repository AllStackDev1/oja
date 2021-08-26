export interface IAddress {
  street?: string
  city?: string
  state?: string
  country: string
}

export interface RegisterUserPayloadDto {
  email: string
  lastName: string
  username: string
  password: string
  avatar?: string
  address: IAddress
  firstName: string
  phoneNumber: string
}

export interface RegisterUserResponseDto {
  success: boolean
  message: string
  data?: IUser
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

export interface LoginDto {
  email: string
  password: string
}

export interface IUser extends RegisterUserPayloadDto {
  avatar: string
  dateOfBirth: Date
  isEmailVerified: boolean
  status: string
}
