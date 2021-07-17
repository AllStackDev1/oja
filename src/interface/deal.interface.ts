import { IDocument } from './helpers.interface'
import { IUser } from './user.interface'

export interface IAccountDetails {
  bankName: string
  swiftCode: string
  accountName: string
  accountNumber: string
  currencySymbol: string
  amount: { $numberDecimal: string }
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
  type: TransactionTypeEnum
  amount: { $numberDecimal: string }
}

export interface IDeal extends IDocument {
  user: IUser
  debit: IAccountDetails
  credit: IAccountDetails
  rate: { $numberDecimal: string }
  transactionFee: { $numberDecimal: string }
  settlementFee: { $numberDecimal: string }
  transactions: ITransaction
}

export interface IActiveDealsLatestTransaction extends IDocument {
  debit: {
    currencySymbol: string
    currencyName: string
    amount: number
  }
  credit: {
    currencySymbol: string
    currencyName: string
    amount: number
  }
  progress: number
  latestTransaction: {
    user: string
    type: string
    amount: number
    createdAt: string
  }
}
