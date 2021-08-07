/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { Box, Icon, Text, Flex, Button, Heading } from '@chakra-ui/react'
import Filter from 'components/Filter'
import CustomTable from 'components/CustomTable'
import { getFormattedDate } from 'utils/helpers'
import { FaLongArrowAltUp, FaLongArrowAltDown } from 'react-icons/fa'
import { IAny } from 'interface'

interface ITrans {
  user: string
  type: string
  amount: number
  createdAt: string
}
interface Props {
  debitCurrencySymbol?: string
  creditCurrencySymbol?: string
  transactions: ITrans[]
}

const RecentTransactions: React.FC<Props> = ({
  debitCurrencySymbol,
  creditCurrencySymbol,
  transactions
}): JSX.Element => {
  const [activePage, setActivePage] = React.useState(1)
  const [totalEntries, setTotalEntries] = React.useState(0)
  const [limit, setLimit] = React.useState(20)
  const [data, setData] = React.useState<ITrans[]>([])

  const columns = [
    {
      id: '_id',
      Header: 'No',
      Cell: (row: Record<string, IAny<number>>) => +row.row.id + 1
    },
    {
      id: 'createdAt',
      Header: 'Transaction Date',
      accessor: (row: Record<string, string>) => getFormattedDate(row.createdAt)
    },
    {
      Header: 'Type',
      id: 'type',
      accessor: (row: Record<string, string>) => (
        <Flex align="center">
          <Flex
            w={6}
            h={6}
            align="center"
            justify="center"
            rounded="full"
            bgColor={row.type === 'Received' ? 'green.100' : 'red.100'}
          >
            <Icon
              boxSize={4}
              as={
                row.type === 'Received' ? FaLongArrowAltUp : FaLongArrowAltDown
              }
              color={row.type === 'Received' ? 'green.300' : 'red.300'}
            />
          </Flex>
          <Text ml={1}>{row.type}</Text>
        </Flex>
      )
    },
    {
      Header: 'From/To',
      accessor: 'user'
    },
    {
      Header: 'Amount',
      accessor: (row: Record<string, string>) => (
        <Text>
          {row.type === 'Received'
            ? creditCurrencySymbol + '' + row.amount
            : debitCurrencySymbol + '' + row.amount}
        </Text>
      )
    }
  ]

  React.useEffect(() => {
    if (transactions.length) {
      const _data = transactions.slice(
        (activePage - 1) * limit,
        (activePage - 1) * limit + limit
      )
      setData(_data)
      setTotalEntries(transactions.length)
    }
  }, [transactions, limit, activePage])

  const pagination = Array(Math.ceil(totalEntries / limit))
    .fill(null)
    .map((_, i) => i + 1)

  return (
    <>
      <Box mt={6}>
        <Flex p={6} justify="space-between">
          <Box>
            <Heading fontWeight={600} fontSize="xl">
              Recent Transactions
            </Heading>
            <Text mt={1} fontSize="sm" lineHeight={4} color="gray.600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </Text>
          </Box>
          <Filter />
        </Flex>
        <CustomTable
          data={data}
          variant="simple"
          columns={columns}
          name="transactions"
        />
      </Box>
      <Flex
        p={6}
        w="full"
        bottom={0}
        pos="absolute"
        align="center"
        justify="space-between"
      >
        <Text fontSize="sm" lineHeight="17px" color="gray.500">
          Showing {(activePage - 1) * limit + 1} to{' '}
          {totalEntries > activePage * limit
            ? activePage * limit
            : totalEntries}{' '}
          of {totalEntries} entries
        </Text>
        <Flex w={40} align="center" justify="space-between">
          <Button type="button" isDisabled={activePage === 1}>
            Prev
          </Button>
          <Button type="button" isDisabled={activePage <= pagination.length}>
            Next
          </Button>
        </Flex>
      </Flex>
    </>
  )
}

export default RecentTransactions
