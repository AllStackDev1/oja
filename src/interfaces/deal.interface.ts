import { IDocument } from './helpers.interface'
import { IUser } from './user.interface'

export interface IDealBank {
  name: string
  code: number | string
  swiftCode?: string
  routingNumber?: number | string
}

export interface IAccountDetails {
  bank?: IDealBank
  amount: number | { $numberDecimal: string }
  accountName?: string
  accountNumber?: string
}

export enum TransactionTypeEnum {
  SENT = 'Sent',
  RECEIVED = 'Received'
}

export enum DealStatusEnum {
  COMPLETED = 'COMPLETED',
  PROCESSING = 'PROCESSING',
  PENDING = 'PENDING'
}

export interface ITransaction {
  user: IUser
  amount: number
  type: TransactionTypeEnum
  createAt: string
}

export interface IDeal extends IDocument {
  user: IUser
  debit: IAccountDetails
  credit: IAccountDetails
  rate: number
  type: string
  transactionFee: number
  settlementFee: number
  transactions: ITransaction
}

interface IActiveDealAccD {
  currency: {
    name: string
    code: string
    symbol: string
  }
  amount: number
  accountName: string
  accountNumber: string
  bank: IDealBank
}

export interface IActiveDealsLatestTransaction extends IDocument {
  rate: number
  type: string
  debit: IActiveDealAccD
  credit: IActiveDealAccD
  progress: number
  latestTransaction?: {
    user: string
    type: string
    amount: number
    createdAt: string
  }
  transactions?: [
    {
      user: string
      type: string
      amount: number
      createdAt: string
    }
  ]
}
