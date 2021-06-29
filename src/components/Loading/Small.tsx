import React from 'react'
import { Spinner, SpinnerProps } from '@chakra-ui/react'

const SmallSpinner: React.FC<SpinnerProps> = props => (
  <Spinner
    thickness="4px"
    speed="0.65s"
    size="sm"
    emptyColor="gray.200"
    color="cf.400"
    {...props}
  />
)

export default SmallSpinner
