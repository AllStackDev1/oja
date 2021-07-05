import React from 'react'
import PropTypes from 'prop-types'
import { Box, Text, Icon, Flex, Heading, GridItem } from '@chakra-ui/react'

import { OjaCard } from 'components/SVG'
import { FaEllipsisH } from 'react-icons/fa'
import LogoIcon from 'components/SVG/LogoIcon'

const AmountReceivedCard = (): JSX.Element => {
  return (
    <GridItem rounded="sm" p={6} boxShadow="main" border="2px solid #E7FAF8">
      <Heading fontSize="md" pos="relative" fontWeight={600}>
        Amount Received (
        <Text as="span" color="gray.400">
          232139422 Stanbic IBTC
        </Text>
        )
        <Text as="span" color="gray.300" pos="absolute" right={0}>
          <Icon as={FaEllipsisH} />
        </Text>
      </Heading>
      <Box mt={4} pos="relative">
        <Box
          mt={5}
          w={44}
          left="0"
          right="0"
          mx="auto"
          color="white"
          pos="absolute"
          textAlign="center"
          fontWeight={600}
        >
          <Text as="sup" fontWeight={400} fontSize="sm">
            ₦
          </Text>
          <Text as="span" fontSize="2.5rem">
            129,125
          </Text>
          <Text as="span" fontSize="15px">
            .97
          </Text>
          <Flex w="full" justify="center">
            <Icon as={LogoIcon} />
          </Flex>
        </Box>
        <OjaCard />
      </Box>
    </GridItem>
  )
}

AmountReceivedCard.propTypes = {}

export default AmountReceivedCard
