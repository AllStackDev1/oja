// import { ResponsePayload } from './helpers.interface'
import {
  RegisterUserPayloadDto,
  RegisterUserResponseDto,
  LoginDto,
  UserDto,
  VerifyOtpPayloadDto,
  VerifyOtpStatus,
  ResendOtpPayloadDto,
  ResendOtpResponse
} from './user.interface'

export interface IAppContext {
  isOpen: boolean
  onOpen(): void
  onClose(): void
  modalType: string
  handleModal(): void
  toggleMenu(): void
  isMenuOpen: boolean
}

export interface IApiContext {
  register(e: RegisterUserPayloadDto): Promise<RegisterUserResponseDto>
  verifyOTP(e: VerifyOtpPayloadDto): Promise<VerifyOtpStatus>
  login(e: LoginDto): Promise<Record<string, Record<string, string>>>
  resendOTP(e: ResendOtpPayloadDto): Promise<ResendOtpResponse>
  verifyEmail(e: string): Promise<unknown>
  getUser(e: string): Promise<void>
  getUsers(
    e?: Record<string, string>
  ): Promise<Record<string, Record<string, Array<Record<string, string>>>>>
  getUsersCount(
    e?: Record<string, string>
  ): Promise<Record<string, Record<string, Array<Record<string, string>>>>>
  getCountries(
    e?: Record<string, string | boolean>
  ): Promise<Record<string, Record<string, Array<Record<string, string>>>>>
  updateUser(id: string, p: Record<string, string>): Promise<void>
  deleteUser(id: string): Promise<void>
  deleteUsers(ids: [string]): Promise<void>
  updateProfile(id: string, p: Record<string, string>): Promise<void>
}

export interface IStore {
  authToken?: string
  user?: UserDto
}

export interface IAuthContext {
  user: UserDto
  logout(): void
  session: boolean
  rememberMe: boolean
  store(e: IStore): void
  isAuthenticated(): IStore
  setRememberMe(e: boolean): React.Dispatch<React.SetStateAction<boolean>>
  setUser(
    e?: UserDto
  ): React.Dispatch<React.SetStateAction<UserDto | undefined>>
  setSession(e: boolean): React.Dispatch<React.SetStateAction<boolean>>
  errorMessage?: string
  successMessage?: string
  setErrorMessage(
    e: string | null
  ): React.Dispatch<React.SetStateAction<boolean>>
  setSuccessMessage(
    e: string | null
  ): React.Dispatch<React.SetStateAction<boolean>>
}
