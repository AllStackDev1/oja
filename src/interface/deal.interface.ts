import { IDocument } from './helpers.interface'
import { IUser } from './user.interface'

export interface IAccountDetails {
  bank: {
    name: string
    code: number | string
    swiftCode?: string
    routingNumber?: number | string
  }
  amount: number
  accountName: string
  accountNumber: string
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
  transactionFee: number
  settlementFee: number
  transactions: ITransaction
}

export interface IActiveDealsLatestTransaction extends IDocument {
  rate: number
  type: string
  debit: {
    currency: {
      name: string
      code: string
      symbol: string
    }
    amount: number
    accountName: string
    accountNumber: string
    bankName: string
  }
  credit: {
    currency: {
      name: string
      code: string
      symbol: string
    }
    amount: number
    accountName: string
    accountNumber: string
    bankName: string
  }
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
