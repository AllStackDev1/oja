import React from 'react'
import { useQuery } from 'react-query'
import { RouteComponentProps } from 'react-router-dom'
import { Box, Text, Icon, Flex, Grid, GridItem } from '@chakra-ui/react'
import { IoMdInformationCircle } from 'react-icons/io'

import Wrapper from 'containers/Layout/Wrapper'
import {
  ActiveDealsCard,
  AmountSentCard,
  RecentTransactions,
  AmountReceivedCard
} from 'components/Deal'
import ReloadCard from 'components/ReloadCard'

import useApi from 'context/Api'
import { formatMoney } from 'utils/helpers'
import { TransactionTypeEnum } from 'interface'

interface RouteParams {
  id: string
}
const DealTransactionsDetail: React.FC<RouteComponentProps<RouteParams>> = (
  props
): JSX.Element => {
  const {
    match: {
      params: { id }
    }
  } = props

  const { getDeal } = useApi()
  const { data, error, refetch, isLoading } = useQuery('deal', () =>
    getDeal(id)
  )

  const getAmountSentPercent = (total: number) => {
    return +(((total || 0) * 100) / (data?.data?.debit?.amount || 1)).toFixed(2)
  }

  const getTotalAmount = (type: TransactionTypeEnum) => {
    return data?.data?.transactions?.reduce((a, b) => {
      return (b.type === type && a + +b.amount) || a
    }, 0)
  }

  const sent = getTotalAmount(TransactionTypeEnum.SENT) || 0
  const received = getTotalAmount(TransactionTypeEnum.RECEIVED) || 0

  return (
    <Wrapper
      title="Oj'a. | Deal Details"
      href="/dashboard/deal"
      content="This page shows details of a deal"
    >
      {isLoading || error ? (
        <ReloadCard
          h="100vh"
          bg="white"
          error={error}
          justify="center"
          refetch={refetch}
          text="fetching deal details"
          isLoading={isLoading}
        />
      ) : (
        <Grid mx={10} columnGap={6} templateColumns="repeat(3, 1fr)">
          <GridItem colSpan={2} rounded="lg" boxShadow="main" pos="relative">
            <Box>
              <Box p={6}>
                <Text fontWeight={600} fontSize="md">
                  {data?.data?.debit.currency.name} {'to '}
                  {data?.data?.credit.currency.name}
                </Text>
                <Flex align="center">
                  <Text fontWeight="300" fontSize="26px">
                    {formatMoney(
                      data?.data?.debit?.amount || 0,
                      data?.data?.debit.currency.code
                    )}
                  </Text>
                  <Text mx={2} fontWeight="300" fontSize="26px">
                    to
                  </Text>
                  <Text fontWeight="300" fontSize="26px">
                    {formatMoney(
                      data?.data?.credit?.amount || 0,
                      data?.data?.credit.currency.code
                    )}
                  </Text>
                </Flex>
              </Box>
              <Flex p={6} color="white" bgColor="ojaDark">
                <Icon as={IoMdInformationCircle} boxSize={6} />
                <Text ml={3} fontSize="sm" lineHeight="150%">
                  Cas should reflect Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit, sed do eiusmod tempor incid id unt ut labore
                  et dolore magna aliqua
                </Text>
              </Flex>
            </Box>
            <RecentTransactions
              debitCurrencySymbol={data?.data?.debit.currency.symbol}
              creditCurrencySymbol={data?.data?.credit.currency.symbol}
              transactions={data?.data?.transactions || []}
            />
          </GridItem>
          <GridItem colSpan={1}>
            <Grid rowGap={8}>
              <AmountSentCard
                percentage={getAmountSentPercent(sent)}
                sentTotal={formatMoney(
                  sent || 0,
                  data?.data?.debit.currency.code
                )}
              />
              <AmountReceivedCard
                receivedTotal={formatMoney(
                  received || 0,
                  data?.data?.credit.currency.code
                )}
                bank={data?.data?.credit?.bank}
                accountNumber={data?.data?.credit?.accountNumber || ''}
              />
              <ActiveDealsCard currentDeal={data?.data?._id} />
            </Grid>
          </GridItem>
        </Grid>
      )}
    </Wrapper>
  )
}

export default DealTransactionsDetail
