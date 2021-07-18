import React from 'react'
import moment from 'moment'
import {
  Box,
  Text,
  Icon,
  Flex,
  Link,
  Heading,
  Progress
} from '@chakra-ui/react'
import { Link as ReactLink } from 'react-router-dom'
import { FaLongArrowAltUp, FaLongArrowAltDown, FaEye } from 'react-icons/fa'
import { IActiveDealsLatestTransaction } from 'interface'
import { VendToIcon } from 'components/SVG'

const ActiveDeal: React.FC<IActiveDealsLatestTransaction> = ({
  _id,
  debit,
  credit,
  progress,
  latestTransaction
}): JSX.Element => {
  const isTrue = latestTransaction?.type === 'Received'
  return (
    <Box p={5}>
      <Flex align="center" justify="space-between">
        <Flex align="center">
          <Icon as={VendToIcon} color="ojaDark" />
          <Text ml={3} fontSize="md" letterSpacing="-0.4px">
            {debit.currencyName} to {credit.currencyName}
          </Text>
        </Flex>
        <Link
          px={3}
          py={1}
          d="flex"
          rounded="5px"
          as={ReactLink}
          borderWidth={1}
          alignItems="center"
          color="ojaSkyBlue"
          borderColor="ojaSkyBlue"
          bgColor="ojaSkyBlueFade"
          _hover={{ textDecor: 'none' }}
          to={`/dashboard/deals/${_id}`}
        >
          <Icon as={FaEye} />
          <Text as="span" ml={2}>
            Details
          </Text>
        </Link>
      </Flex>
      {latestTransaction ? (
        <>
          <Text fontSize="sm" letterSpacing="-0.4px" color="gray.400">
            {credit.currencySymbol}
            {latestTransaction.amount}
            <Icon
              boxSize={4}
              as={isTrue ? FaLongArrowAltUp : FaLongArrowAltDown}
              color={isTrue ? 'green.300' : 'red.300'}
            />{' '}
            {isTrue ? 'received from' : 'sent to'} {latestTransaction.user}
          </Text>
          <Heading mt={2} fontSize="x-small" lineHeight="12px">
            Deals Progress
          </Heading>
          <Flex w="full" align="center">
            <Box w="50%" mr={5}>
              <Progress
                value={progress}
                h={1}
                colorScheme={
                  isTrue ? 'ojaColorSchemaSkyBlue' : 'ojaColorSchemaError'
                }
              />
            </Box>
            <Text
              as="span"
              fontWeight={800}
              fontSize="x-small"
              color={isTrue ? 'ojaSkyBlue' : 'red.500'}
            >
              {progress}%
            </Text>
          </Flex>
          <Text
            mt={2}
            mb={3}
            fontSize="sm"
            fontWeight="light"
            letterSpacing="-0.4px"
          >
            {moment(latestTransaction.createdAt).fromNow()}
          </Text>
        </>
      ) : (
        <Flex h={{ lg: 24 }} justify="center" align="center">
          <Text color="gray.500">No Transaction Yet</Text>
        </Flex>
      )}
    </Box>
  )
}

export default ActiveDeal
