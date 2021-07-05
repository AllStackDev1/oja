import React from 'react'
import PropTypes from 'prop-types'
import { Box, Text, Flex, Heading } from '@chakra-ui/react'
import Filter from 'components/Filter'

const RecentTransactions = (): JSX.Element => {
  return (
    <Box mt={6} rounded="lg" boxShadow="main">
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
    </Box>
  )
}

RecentTransactions.propTypes = {}

export default RecentTransactions
