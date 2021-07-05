import React from 'react'
import Wrapper from 'containers/Layout/Wrapper'
import { Box, Text, Icon, Flex, Grid, GridItem } from '@chakra-ui/react'

const Wallet = (): JSX.Element => {
  return (
    <Wrapper
      title="Wallet | Dashboard"
      href="/dashboard/wallet"
      content="This is the application dashboard wallet page"
    >
      <Box>This is the wallet page</Box>
    </Wrapper>
  )
}

export default Wallet
