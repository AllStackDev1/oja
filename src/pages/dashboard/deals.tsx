import React from 'react'
import { useQuery } from 'react-query'
import {
  Box,
  Grid,
  Flex,
  Text,
  GridItem,
  Heading,
  useDisclosure
} from '@chakra-ui/react'
import { FiArrowRight } from 'react-icons/fi'

import Wrapper from 'containers/Layout/Wrapper'
import Small from 'components/Loading/Small'
import { ActiveDeal } from 'components/Dashboard/Deal'
import { CustomButton } from 'components/Auth'

import useApi from 'context/Api'
import { CreateDealModal } from 'components/Dashboard/Deal/Create'

const Deals = (): JSX.Element => {
  const { onOpen, onClose, isOpen } = useDisclosure()
  const { getDeals } = useApi()

  const { data, isLoading, error } = useQuery('deals', () => getDeals())

  return (
    <Wrapper
      title="Oj'a. | Dashboard | Deals"
      href="/dashboard/deals"
      content="This is the application dashboard deals page"
    >
      <Box px={{ xl: 10 }} mt={{ xl: 10 }} w="full">
        <Flex w="full" mb={{ xl: 5 }} align="center" justify="space-between">
          <Heading>Your Deals</Heading>
          <Box w={{ xl: 80 }}>
            <CustomButton
              px={8}
              h={{ xl: 20 }}
              w="full"
              d="flex"
              type="button"
              color="white"
              bgColor="ojaDark"
              title="CREATE NEW DEAL"
              _hover={{ bgColor: 'ojaDark' }}
              fontSize={{ base: 'sm', xl: 'md' }}
              onClick={() => onOpen()}
              rightIcon={
                <FiArrowRight fontSize={20} className="auth-btn-arrow" />
              }
            />
          </Box>
        </Flex>
        <Grid
          gap={5}
          w="full"
          templateRows="repeat(2, 1fr)"
          templateColumns={{
            base: 'repeat(1, 1fr)',
            md: 'repeat(2, 1fr)',
            '2xl': 'repeat(3, 1fr)',
            '4xl': 'repeat(4, 1fr)'
          }}
        >
          {isLoading && <Small thickness="2px" />}
          {!isLoading && (
            <>
              {error ? (
                <Text>Error: {error}</Text>
              ) : (
                <>
                  {data?.data?.map(r => (
                    <GridItem
                      key={r._id}
                      rounded="lg"
                      borderWidth={1}
                      boxShadow="main"
                      borderColor="gray.100"
                    >
                      <ActiveDeal {...r} />
                    </GridItem>
                  ))}
                </>
              )}
            </>
          )}
        </Grid>
      </Box>
      <CreateDealModal onClose={onClose} isOpen={isOpen} />
    </Wrapper>
  )
}

export default Deals
