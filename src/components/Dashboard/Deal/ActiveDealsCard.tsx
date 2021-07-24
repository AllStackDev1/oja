import React from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Text,
  Icon,
  Flex,
  Divider,
  Heading,
  GridItem
} from '@chakra-ui/react'
import { useQuery } from 'react-query'
import { Fade } from 'react-awesome-reveal'

import { Small } from 'components/Loading'
import ActiveDeal from './ActiveDeal'

import useApi from 'context/Api'
import { EmptyTableIcon } from 'components/SVG'

interface Props {
  w?: string | number
  currentDeal?: string
}

const ActiveDeals: React.FC<Props> = ({
  w = 'full',
  currentDeal
}): JSX.Element => {
  const { getDeals } = useApi()
  const { data, isLoading, error } = useQuery('active-deals', () =>
    getDeals({ status: 'PROCESSING' })
  )

  return (
    <GridItem w={w} rounded="sm" boxShadow="main" border="2px solid #E7FAF8">
      <Box pt={6} px={6} pb={3}>
        <Heading fontSize="xl" fontWeight={600}>
          Active Deals
        </Heading>
        <Text mt={1} fontSize="sm" lineHeight={4} color="gray.600">
          Below shows your active deals latest transaction
        </Text>
      </Box>
      <Divider borderColor="gray.300" />
      <Box px={6}>
        {isLoading && <Small thickness="2px" />}
        {!isLoading && (
          <>
            {error ? (
              <Text>Error: {error}</Text>
            ) : (
              <>
                {!data?.data?.length ? (
                  <Flex
                    h={120}
                    align="center"
                    flexDir="column"
                    justify="center"
                  >
                    <Icon as={EmptyTableIcon} boxSize={10} />
                    <Text mt={10} color="gray.400">
                      There are no active deal(s) made yet
                    </Text>
                  </Flex>
                ) : (
                  <Fade cascade delay={1000}>
                    {data?.data
                      ?.filter(d => d._id !== currentDeal)
                      ?.map((r, i) => (
                        <React.Fragment key={r._id}>
                          <ActiveDeal {...r} />
                          {data?.data?.length !== i + 1 && (
                            <Divider borderColor="gray.300" />
                          )}
                        </React.Fragment>
                      ))}
                  </Fade>
                )}
              </>
            )}
          </>
        )}
      </Box>
    </GridItem>
  )
}

ActiveDeals.propTypes = {
  w: PropTypes.any
}

export default ActiveDeals
