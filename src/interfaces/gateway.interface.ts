import { IDocument } from './helpers.interface'
import { IUser } from './user.interface'

export interface IPlaid {
  itemId: string
  accessToken: string
}

export interface IGateway extends IDocument {
  user: IUser
  plaid: IPlaid
  okra: IPlaid
}

export enum GatewayTypeEnum {
  PLAID = 'PLAID',
  OKRA = 'OKRA'
}

export interface IGatewayType {
  type: GatewayTypeEnum
}

export interface IGatewayValidate {
  type: GatewayTypeEnum
  publicToken: string
}
