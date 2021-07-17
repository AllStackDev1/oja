import React from 'react'
import { Box, Icon, Text, Flex, Button, Heading } from '@chakra-ui/react'
import Filter from 'components/Filter'
import CustomTable from 'components/CustomTable'
import { getFormattedDate } from 'utils/helpers'
import { FaLongArrowAltUp, FaLongArrowAltDown } from 'react-icons/fa'
import { IAny } from 'interface'

const RecentTransactions = (): JSX.Element => {
  const [activePage, setActivePage] = React.useState(1)
  const [limit, setFetchLimit] = React.useState(20)
  const [totalUser, setTotalUser] = React.useState(10)

  const columns = [
    {
      id: '_id',
      Header: 'No',
      Cell: (row: Record<string, IAny<number>>) => row.row.id + 1
    },
    {
      id: 'createdAt',
      Header: 'Transaction Date',
      accessor: (row: Record<string, string>) => getFormattedDate(row.createdAt)
    },
    {
      Header: 'Type',
      id: 'isReceiving',
      accessor: (row: Record<string, string>) => (
        <Flex align="center">
          <Flex
            w={6}
            h={6}
            align="center"
            justify="center"
            rounded="full"
            bgColor={!row.isReceiving ? 'green.100' : 'red.100'}
          >
            <Icon
              boxSize={4}
              as={!row.isReceiving ? FaLongArrowAltUp : FaLongArrowAltDown}
              color={!row.isReceiving ? 'green.300' : 'red.300'}
            />
          </Flex>
          <Text ml={1}>{row.isReceiving ? 'Received' : 'Sent'}</Text>
        </Flex>
      )
    },
    {
      Header: 'From/To',
      accessor: 'userName'
    },
    {
      Header: 'Amount',
      accessor: 'amountWithCurrency'
    }
  ]

  const data = [
    {
      _id: 1,
      createdAt: '2021-01-04T23:59:00.093+00:00',
      isReceiving: true,
      userName: '@korede_koko',
      amountWithCurrency: '₦214,000.00'
    },
    {
      _id: 2,
      createdAt: '2021-03-04T23:59:00.093+00:00',
      isReceiving: true,
      userName: '@vlad',
      amountWithCurrency: '₦4,000.00'
    },
    {
      _id: 3,
      createdAt: '2021-04-04T23:59:00.093+00:00',
      isReceiving: false,
      userName: '@jerry_gmoney',
      amountWithCurrency: '$1000.00'
    },
    {
      _id: 4,
      createdAt: '2021-06-04T23:59:00.093+00:00',
      isReceiving: true,
      userName: '@lilfero',
      amountWithCurrency: '$2,000.00'
    },
    {
      _id: 5,
      createdAt: '2021-07-04T23:59:00.093+00:00',
      isReceiving: false,
      userName: '@Sickboy',
      amountWithCurrency: '£2000.00'
    }
  ]

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
          {totalUser > activePage * limit ? activePage * limit : totalUser} of{' '}
          {totalUser} entries
        </Text>
        <Flex w={40} align="center" justify="space-between">
          <Button type="button" isDisabled>
            Prev
          </Button>
          <Button type="button">Next</Button>
        </Flex>
      </Flex>
    </>
  )
}

export default RecentTransactions
