import React from 'react'
import Wrapper from 'containers/Wrapper'
import {
  Box,
  Text,
  Icon,
  Flex,
  Link,
  Heading,
  Grid,
  GridItem
} from '@chakra-ui/react'
import { IoMdInformationCircle } from 'react-icons/io'
import Filter from 'components/Filter'

const Home = (): JSX.Element => {
  return (
    <Wrapper
      title="Home | Dashboard"
      href="/dashboard/home"
      content="This is the application login page"
    >
      <Grid mx={{ xl: 10 }} columnGap={6} templateColumns="repeat(3, 1fr)">
        <GridItem colSpan={2}>
          <Box borderTopRadius="lg" shadow="lg">
            <Box p={{ xl: 6 }}>
              <Text fontWeight={600} fontSize="md">
                Dollar to Naira
              </Text>
              <Text fontWeight="300" fontSize="26px">
                100,000.00
              </Text>
            </Box>
            <Flex p={{ xl: 6 }} color="white" bgColor="ojaDark">
              <Icon as={IoMdInformationCircle} boxSize={6} />
              <Text ml={3} fontSize="md" lineHeight="150%">
                Cas should reflect Lorem ipsum dolor sit amet, consectetur
                adipiscing elit, sed do eiusmod tempor incid id unt ut labore et
                dolore magna aliqua
              </Text>
            </Flex>
          </Box>
          <Box mt={{ xl: 6 }} rounded="lg" shadow="lg">
            <Flex p={{ xl: 6 }} justify="space-between">
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
        </GridItem>
        <GridItem colSpan={1} bgColor="blue">
          <Grid mx={{ xl: 10 }}>
            <GridItem rounded="lg" shadow="lg">
              <Text>Dollar to Naira</Text>
              <Text>100,000.00</Text>
            </GridItem>
            <GridItem rounded="lg" shadow="lg">
              <Text>Amount Received (232139422 Stanbic IBTC)</Text>
            </GridItem>
            <GridItem rounded="lg" shadow="lg">
              <Text>Amount Received (232139422 Stanbic IBTC)</Text>
            </GridItem>
          </Grid>
        </GridItem>
      </Grid>
    </Wrapper>
  )
}

export default Home
