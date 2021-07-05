import { CreateUserDto, ILoginDto, UserDto } from './user.interface'

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
  register(e: CreateUserDto): Promise<Record<string, Record<string, string>>>
  auth(e: ILoginDto): Promise<Record<string, Record<string, string>>>
  verifyOTP(e: string): Promise<void>
  resendCode(e: string): Promise<void>
  getUser(e: string): Promise<void>
  getUsers(
    e: Record<string, string>
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
  isAuthenticated(): void
  setRememberMe: React.Dispatch<React.SetStateAction<boolean>>
  setUser(
    e?: Record<string, string>
  ): React.Dispatch<React.SetStateAction<Record<string, string> | undefined>>
  setSession(): React.Dispatch<React.SetStateAction<boolean>>
}
