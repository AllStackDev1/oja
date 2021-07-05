import React from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Text,
  Icon,
  Flex,
  Link,
  Divider,
  Heading,
  GridItem,
  Progress
} from '@chakra-ui/react'
import { BiBell } from 'react-icons/bi'
import { Link as ReactLink } from 'react-router-dom'
import { FaLongArrowAltUp, FaLongArrowAltDown } from 'react-icons/fa'

const ActiveTransactions = (): JSX.Element => {
  const transactions = [
    {
      _id: 1,
      progress: 75,
      isReceiving: true,
      currencyTo: 'Naira',
      currencyFrom: 'Dollar',
      createdAt: '2 days ago',
      amountWithCurrency: '$2000',
      userName: '@jerry_gmoney'
    },
    {
      _id: 2,
      progress: 25,
      isReceiving: false,
      currencyTo: 'Pounds',
      currencyFrom: 'Naira',
      createdAt: '2 hours ago',
      amountWithCurrency: '£200',
      userName: '@spaky_OJ'
    }
  ]
  return (
    <GridItem rounded="sm" boxShadow="main" border="2px solid #E7FAF8">
      <Box pt={6} px={6} pb={3}>
        <Heading fontSize="xl" fontWeight={600}>
          Active Transactions
        </Heading>
        <Text mt={1} fontSize="sm" lineHeight={4} color="gray.600">
          Below shows your active transactions
        </Text>
      </Box>
      <Divider borderColor="gray.300" />
      <Box px={6}>
        {transactions.map((r, i) => (
          <React.Fragment key={r._id}>
            <Box pt={5}>
              <Flex align="center" justify="space-between">
                <Flex align="center">
                  <Icon as={BiBell} boxSize={5} />
                  <Text ml={3} fontSize="md" letterSpacing="-0.4px">
                    {r.currencyFrom} to {r.currencyTo}
                  </Text>
                </Flex>
                <Link
                  as={ReactLink}
                  to={`/${r._id}`}
                  px={6}
                  py={1}
                  bgColor="ojaSkyBlueFade"
                >
                  View all
                </Link>
              </Flex>
              <Text fontSize="sm" letterSpacing="-0.4px" color="gray.400">
                {r.amountWithCurrency}{' '}
                <Icon
                  boxSize={4}
                  as={!r.isReceiving ? FaLongArrowAltUp : FaLongArrowAltDown}
                  color={!r.isReceiving ? 'green.300' : 'red.300'}
                />{' '}
                {r.isReceiving ? 'received from' : 'sent to'} {r.userName},
              </Text>
              <Heading mt={2} fontSize="x-small" lineHeight="12px">
                Transaction Progress
              </Heading>
              <Flex w="full" align="center">
                <Box w="50%" mr={5}>
                  <Progress
                    value={r.progress}
                    h={1}
                    colorScheme={r.isReceiving ? 'ojaButton' : 'ojaError'}
                  />
                </Box>
                <Text
                  as="span"
                  fontWeight={800}
                  fontSize="x-small"
                  color={r.isReceiving ? 'ojaSkyBlue' : 'red.500'}
                >
                  {r.progress}%
                </Text>
              </Flex>
              <Text
                mt={2}
                mb={3}
                fontSize="sm"
                fontWeight="light"
                letterSpacing="-0.4px"
              >
                {r.createdAt}
              </Text>
            </Box>
            {transactions.length !== i + 1 && (
              <Divider borderColor="gray.300" />
            )}
          </React.Fragment>
        ))}
      </Box>
    </GridItem>
  )
}

ActiveTransactions.propTypes = {}

export default ActiveTransactions
