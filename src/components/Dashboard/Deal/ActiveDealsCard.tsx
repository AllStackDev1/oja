import React from 'react'
import PropTypes from 'prop-types'
import { Box, Text, Fade, Divider, Heading, GridItem } from '@chakra-ui/react'
import { useQuery } from 'react-query'

import { Small } from 'components/Loading'
import ActiveDeal from './ActiveDeal'

import useApi from 'context/Api'

interface Props {
  w?: string | number
  r?: string
}

const ActiveDeals: React.FC<Props> = ({ w = 'full', r }): JSX.Element => {
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
              <Fade in={true}>
                {data?.data
                  ?.filter(d => d._id !== r)
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
      </Box>
    </GridItem>
  )
}

ActiveDeals.propTypes = {
  w: PropTypes.any
}

export default ActiveDeals
