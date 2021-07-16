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

const TransactionSummary = (): JSX.Element => {
  const data = [
    {
      id: '$1,000.00',
      title: 'Sending'
    },
    {
      id: '₦1,000,000.00',
      title: 'Recieving'
    },
    {
      id: '$20',
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
          Dollar To Naira
        </Heading>
        <Flex
          mt={10}
          align="center"
          fontSize="md"
          fontWeight={600}
          justify="space-between"
        >
          {data.map(d => (
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
            <Text>Prince Isaac</Text>
            <Text>Stanbic IBTC</Text>
            <Text>23843001203</Text>
          </Box>
          <Box>
            <Text color="gray.400" fontFamily="Futura" fontWeight="500">
              Credit Account
            </Text>
            <Text>Prince Isaac</Text>
            <Text>Bank Of America</Text>
            <Text>2384300122303</Text>
          </Box>
        </Flex>

        <FormControl display="flex" alignItems="center">
          <Switch id="accept-tc" size="sm" colorScheme="ojaColorSchemaDark" />
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
