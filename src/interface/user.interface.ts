export interface IAddress {
  street: string
  city: string
  state: string
  country: string
}

export interface CreateUserDto {
  email: string
  lastName: string
  userName: string
  password: string
  address: IAddress
  firstName: string
  phoneNumber: string
  confirmPassword: string
}

export type UpdateUserDto = UserDto

export interface ILoginDto {
  email: string
  password: string
}

export interface UserDto extends CreateUserDto {
  avatar: string
  dateOfBirth: Date
  status: string
}
