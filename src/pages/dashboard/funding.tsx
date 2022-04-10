import React from 'react'
import { useQuery } from 'react-query'
import { Grid, GridItem } from '@chakra-ui/react'
import { RouteComponentProps } from 'react-router-dom'

import useApi from 'context/Api'

import Wrapper from 'containers/Layout/Wrapper'
import { ActiveDeals } from 'components/Deal'
import InteracFundWalletCard from 'components/Interact/InteracFundWalletCard'
import ReloadCard from 'components/ReloadCard'
import SendCashPay from 'components/SendCashPay'

interface RouteParams {
  id: string
}

const Funding: React.FC<RouteComponentProps<RouteParams>> = (
  props
): JSX.Element => {
  const { getDeal } = useApi()
  const {
    history,
    match: {
      params: { id }
    }
  } = props

  const { data, error, refetch, isLoading } = useQuery(['deal', id], () =>
    getDeal(id)
  )

  React.useEffect(() => {
    if (!id) {
      history.replace('/dashboard/deals')
    }
  }, [id])

  const getFundingModule = () => {
    switch (data?.data?.type) {
      case 'NGN_CAD':
        return <SendCashPay deal={data.data} />
      case 'CAD_NGN':
        return <InteracFundWalletCard deal={data.data} />
      default:
        return
    }
  }

  return (
    <Wrapper title="Oj'a. | Funding Wallet" href="/dashboard/funding">
      <Grid
        mt={14}
        mr={10}
        ml={{ base: 28, '4xl': 32 }}
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(3, 1fr)"
        columnGap={{ base: 24, '4xl': 44 }}
      >
        <GridItem colSpan={2} rowSpan={2}>
          {isLoading || error ? (
            <ReloadCard
              h="50vh"
              error={error}
              justify="center"
              refetch={refetch}
              text="fetching deals"
              isLoading={isLoading}
            />
          ) : (
            getFundingModule()
          )}
        </GridItem>

        <ActiveDeals w={110} />
      </Grid>
    </Wrapper>
  )
}

export default Funding
