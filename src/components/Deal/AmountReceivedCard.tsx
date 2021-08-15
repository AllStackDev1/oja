import React from 'react'
import { Box, Text, Icon, Flex, Heading, GridItem } from '@chakra-ui/react'

import { FaEllipsisH } from 'react-icons/fa'
import LogoIcon from 'components/SVG/LogoIcon'
import Card from 'assets/images/card.svg'
import { IDealBank } from 'interface'

interface Props {
  bank?: IDealBank
  accountNumber: string
  receivedTotal: string
}

const AmountReceivedCard: React.FC<Props> = ({
  bank,
  receivedTotal,
  accountNumber
}): JSX.Element => {
  const array1 = receivedTotal.split('.')

  return (
    <GridItem rounded="sm" p={6} boxShadow="main" border="2px solid #E7FAF8">
      <Flex justify="space-between" pos="relative">
        <Heading fontSize="md" fontWeight={600}>
          Amount Received{' '}
          <Text as="span" fontSize="xs" color="gray.400">
            ({accountNumber} {bank?.name})
          </Text>
        </Heading>
        <Text as="span" color="gray.300" pos="absolute" right={0}>
          <Icon as={FaEllipsisH} color="gray.300" />
        </Text>
      </Flex>
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
              {array1[0].slice(0, 1)}
            </Text>
            <Text as="span" fontSize="2.5rem">
              {array1[0].slice(1)}
            </Text>
            <Text as="span" fontSize="15px">
              .{array1[1]}
            </Text>
          </Box>
          <Icon as={LogoIcon} />
        </Flex>
      </Box>
    </GridItem>
  )
}

export default AmountReceivedCard
