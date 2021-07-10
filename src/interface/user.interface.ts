export interface IAddress {
  street: string
  city: string
  state: string
  country: string
}

export interface RegisterUserPayloadDto {
  email: string
  lastName: string
  userName: string
  password: string
  address: IAddress
  firstName: string
  phoneNumber: string
  confirmPassword: string
}

export interface RegisterUserResponseDto {
  success: boolean
  message: string
  data?: UserDto
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
  user?: UserDto
  authToken?: string
}

export interface ResendOtpPayloadDto {
  phoneNumber: string
}

export interface ResendOtpResponse {
  success: boolean
  message: Record<string, Record<string, string>>
}

export type UpdateUserDto = UserDto

export interface LoginDto {
  email: string
  password: string
}

export interface UserDto extends RegisterUserPayloadDto {
  avatar: string
  dateOfBirth: Date
  isEmailVerified: boolean
  status: string
}
