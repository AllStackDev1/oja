import React from 'react'
import {
  Box,
  Text,
  Flex,
  Switch,
  Divider,
  Heading,
  GridItem,
  FormLabel,
  FormControl
} from '@chakra-ui/react'

import { formatMoney } from 'utils/helpers'
import { IDeal } from 'interface'

interface IProps {
  title?: string
  values: IDeal
  inSymbol?: string
  outSymbol?: string
  isTermsAccepted: boolean
  setTermsAccept(e: boolean): void
}

const TransactionSummary = (props: IProps): JSX.Element => {
  const { debit, credit, transactionFee } = props.values

  const info = [
    {
      id: `${props.inSymbol}${formatMoney(Number(debit.amount))}`,
      title: 'Sending'
    },
    {
      id: `${props.outSymbol}${formatMoney(Number(credit.amount))}`,
      title: 'Receiving'
    },
    {
      id: `${props.inSymbol}${formatMoney(Number(transactionFee))}`,
      title: 'Transaction fee'
    }
  ]

  return (
    <GridItem>
      <Box mb={3}>
        <Heading fontWeight={400} fontSize="xl">
          Transaction Summary
        </Heading>
        <Text mt={1} fontSize="sm" lineHeight={4} color="gray.600">
          Lorem ipsum dolor sit amet, consectetur ad eiusmod tempor incididunt
          ut lab.
        </Text>
      </Box>
      <Box p={6} rounded="sm" boxShadow="main">
        <Heading fontWeight={500} fontSize="lg">
          {props.title}
        </Heading>
        <Flex
          mt={10}
          align="center"
          fontSize="md"
          fontWeight={600}
          justify="space-between"
        >
          {info.map(d => (
            <Box key={d.id}>
              <Text color="gray.400">{d.title}</Text>
              <Text>{d.id}</Text>
            </Box>
          ))}
        </Flex>
        <Divider my={6} />

        <Flex mb={10} align="center" fontSize="md" justify="space-between">
          <Box>
            <Text color="gray.400" fontFamily="Futura">
              Debit Account
            </Text>
            <Text>{debit.accountName}</Text>
            <Text>{debit.bankName}</Text>
            <Text>{debit.swiftCode}</Text>
          </Box>
          <Box>
            <Text color="gray.400" fontFamily="Futura" fontWeight="500">
              Credit Account
            </Text>
            <Text>{credit.accountName}</Text>
            <Text>{credit.bankName}</Text>
            <Text>{credit.swiftCode}</Text>
          </Box>
        </Flex>

        <FormControl display="flex" alignItems="center">
          <Switch
            size="sm"
            id="accept-tc"
            colorScheme="ojaColorSchemaDark"
            onChange={() => props.setTermsAccept(!props.isTermsAccepted)}
          />
          <FormLabel
            mb="0"
            ml={3}
            mr={0}
            fontSize="sm"
            color="gray.400"
            htmlFor="accept-tc"
          >
            You hereby agree to our Terms & Conditions guiding this service
          </FormLabel>
        </FormControl>
      </Box>
    </GridItem>
  )
}

export default TransactionSummary
