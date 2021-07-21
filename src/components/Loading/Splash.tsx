import React from 'react'
import PropTypes from 'prop-types'
import { Flex, Text, Spinner } from '@chakra-ui/react'

interface Props {
  text?: string
}
const Splash: React.FC<Props> = ({ text }) => (
  <Flex bg="white" h="100vh" align="center" justify="center">
    <Spinner
      thickness="5px"
      speed="0.65s"
      emptyColor="gray.200"
      size="lg"
      color="gray.500"
    />
    {text && <Text className="loading-text">{text}</Text>}
  </Flex>
)

Splash.propTypes = {
  text: PropTypes.string
}

export default Splash
