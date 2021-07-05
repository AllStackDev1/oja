import React from 'react'
import Wrapper from 'containers/Layout/Wrapper'
import { Box, Text, Icon, Flex, Grid, GridItem } from '@chakra-ui/react'

const VentTo = (): JSX.Element => {
  return (
    <Wrapper
      title="Vent To | Dashboard"
      href="/dashboard/vent-to"
      content="This is the application dashboard vent to page"
    >
      <Box>This is the vent-to page</Box>
    </Wrapper>
  )
}

export default VentTo
