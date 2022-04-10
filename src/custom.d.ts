declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>
  export default content
}

declare module '*.png' {
  const value: React.FunctionComponent<
    React.ImgHTMLAttributes<HTMLImageElement>
  >
  export default value
}

interface ISendcashPayInit {
  siteName?: string
  siteUrl?: string
  siteLogo?: string
  publicKey?: string
  excludedBanks?: any
}

interface ISendcashPayCharge {
  signature: string
  amount: number
  userId: string
  destinationAccountNumber: string
  destinationBankCode: string
  transactionReference: string
  name?: string
}

interface Window {
  SendcashPay: {
    init: (p: ISendcashPayInit) => void
    charge: (p: ISendcashPayCharge) => Promise<any>
  }
}
