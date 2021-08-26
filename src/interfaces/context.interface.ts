/* eslint-disable @typescript-eslint/no-explicit-any */
import { UpdateIUser } from 'interfaces'
import { ICurrency } from './currency.interface'
import { IDeal, IActiveDealsLatestTransaction } from './deal.interface'
import { IGatewayType, IGateway, IGatewayValidate } from './gateway.interface'
import { ResponsePayload } from './helpers.interface'
import {
  IUser,
  LoginDto,
  VerifyOtpStatus,
  ResendOtpResponse,
  VerifyOtpPayloadDto,
  ResendOtpPayloadDto,
  RegisterUserResponseDto,
  RegisterUserPayloadDto
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
  login(e: LoginDto): Promise<ResponsePayload<Record<string, any>, string>>
  resendOTP(e: ResendOtpPayloadDto): Promise<ResendOtpResponse>
  verifyEmail(e: string): Promise<unknown>
  getUser(e: string): Promise<ResponsePayload<Record<string, IUser>, string>>
  getProfile(): Promise<ResponsePayload<Record<string, IUser>, string>>
  getUsers(
    e?: Record<string, string>
  ): Promise<Record<string, Record<string, Array<Record<string, string>>>>>
  getUsersCount(
    e?: Record<string, string>
  ): Promise<Record<string, Record<string, Array<Record<string, string>>>>>
  updateProfile(
    id: string,
    p: UpdateIUser
  ): Promise<ResponsePayload<string, string>>
  getCurrencies(
    e?: Record<string, string | boolean>
  ): Promise<ResponsePayload<ICurrency[], string>>
  createDeal(p: IDeal): Promise<ResponsePayload<string, string>>
  getDeal(
    e: string
  ): Promise<ResponsePayload<IActiveDealsLatestTransaction, string>>
  getDeals(
    e?: Record<string, string>
  ): Promise<ResponsePayload<IActiveDealsLatestTransaction[], string>>
  initiateGateway(e: IGatewayType): Promise<ResponsePayload<string, string>>
  validatedGateway(
    e: IGatewayValidate
  ): Promise<ResponsePayload<IGateway, string>>
}

export interface IStore {
  authToken?: string
  user?: IUser
}

export interface IAuthContext {
  user: IUser
  logout(): void
  session: boolean
  rememberMe: boolean
  store(e: IStore): void
  isAuthenticated(): IStore
  setRememberMe(e: boolean): React.Dispatch<React.SetStateAction<boolean>>
  setUser(e?: IUser): React.Dispatch<React.SetStateAction<IUser | undefined>>
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
