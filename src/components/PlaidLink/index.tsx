import React, { useCallback, FunctionComponent } from 'react'
import {
  usePlaidLink,
  PlaidLinkOptions,
  PlaidLinkOnSuccess
} from 'react-plaid-link'

import useApi from 'context/Api'
import { GatewayTypeEnum } from 'interfaces/gateway.interface'

interface Props {
  token: string
}

const PlaidLink: FunctionComponent<Props> = ({ token }) => {
  const { validatedGateway } = useApi()

  const onSuccess = useCallback<PlaidLinkOnSuccess>(
    async (public_token, metadata) => {
      // send public_token to server
      console.log(metadata)
      console.log(public_token)
      await validatedGateway({
        type: GatewayTypeEnum.PLAID,
        publicToken: public_token
      })
    },
    []
  )

  const config: PlaidLinkOptions = {
    token,
    onSuccess
    // onExit
    // onEvent
  }

  const { open, ready, error } = usePlaidLink(config)

  console.log(error)

  return (
    <button onClick={() => open()} disabled={!ready}>
      Connect a bank account
    </button>
  )
}

export default PlaidLink
