import React from 'react'
import { Box, Text, Flex, Heading, GridItem } from '@chakra-ui/react'
import { ProgressCycle } from 'components/SVG'

interface Props {
  percentage: number
  creditTotal: string
}

const AmountSentCard: React.FC<Props> = ({
  creditTotal,
  percentage
}): JSX.Element => {
  return (
    <GridItem rounded="sm" p={6} boxShadow="main" border="2px solid #E7FAF8">
      <Heading fontWeight={600} fontSize="md">
        Amount Sent
      </Heading>
      <Flex mt={4} w="full" align="center" justify="center" flexDir="column">
        <Flex pos="relative" flexDir="column" align="center" justify="center">
          <Box
            w={36}
            h={36}
            pos="absolute"
            rounded="full"
            bgColor="ojaSkyBlueFade"
          />
          <Text pos="absolute" fontWeight={600} fontSize="1.625rem">
            {creditTotal}
          </Text>
          <ProgressCycle value={percentage} />
        </Flex>
        <Box mt={10} p={2} bgColor="ojaSkyBlueFade">
          <Text fontSize="sm" letterSpacing="-0.4px" color="ojaSkyBlue">
            Transaction Completion {percentage}%
          </Text>
        </Box>
      </Flex>
    </GridItem>
  )
}

export default AmountSentCard
