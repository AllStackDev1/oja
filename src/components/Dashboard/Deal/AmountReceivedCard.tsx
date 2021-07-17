import React from 'react'
import { Box, Text, Icon, Flex, Heading, GridItem } from '@chakra-ui/react'

import { FaEllipsisH } from 'react-icons/fa'
import LogoIcon from 'components/SVG/LogoIcon'
import Card from 'assets/images/card.svg'

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
      <Box
        mt={4}
        h={44}
        w="full"
        rounded="md"
        bgSize="cover"
        bgPos="center"
        bgImage={`url('${Card}')`}
      >
        <Flex h="full" align="center" flexDir="column" justify="center">
          <Box color="white" fontWeight={600}>
            <Text as="sup" fontWeight={400} fontSize="sm">
              ₦
            </Text>
            <Text as="span" fontSize="2.5rem">
              129,125
            </Text>
            <Text as="span" fontSize="15px">
              .97
            </Text>
          </Box>
          <Icon as={LogoIcon} />
        </Flex>
      </Box>
    </GridItem>
  )
}

export default AmountReceivedCard
