import React from 'react'
import { useQuery } from 'react-query'

import Wrapper from 'containers/Layout/Wrapper'
import ReloadCard from 'components/ReloadCard'
import PlaidLink from 'components/PlaidLink'

import useApi from 'context/Api'
import { GatewayTypeEnum } from 'interfaces/gateway.interface'

const PlaidGateway = (): JSX.Element => {
  const { initiateGateway } = useApi()

  const { data, isLoading, error, refetch } = useQuery(
    'token',
    () => initiateGateway({ type: GatewayTypeEnum.PLAID }),
    { retry: false, refetchOnWindowFocus: false, refetchOnReconnect: false }
  )

  return (
    <div>
      <Wrapper
        title="Oj'a. | Plaid Gateway"
        href="/dashboard/plaid/gateway"
        content="This page shows all deals"
      >
        {isLoading || error ? (
          <ReloadCard
            h="50vh"
            error={error}
            justify="center"
            refetch={refetch}
            isLoading={isLoading}
            text="initialize gateway"
          />
        ) : (
          data?.data && <PlaidLink token={data.data} />
        )}
      </Wrapper>
    </div>
  )
}

export default PlaidGateway
