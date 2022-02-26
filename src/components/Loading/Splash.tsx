import React from 'react'
import PropTypes from 'prop-types'
import { Flex, Text, Spinner, FlexProps } from '@chakra-ui/react'

interface Props extends FlexProps {
  text?: string
}
const Splash: React.FC<Props> = ({ text, ...rest }) => (
  <Flex flexDir="column" h="100vh" align="center" justify="center" {...rest}>
    <Spinner
      thickness="5px"
      speed="0.65s"
      emptyColor="gray.200"
      size="lg"
      color="gray.500"
    />
    {text && (
      <Text className="loading-text loading-text-b" color={rest.color || ''}>
        {text}
      </Text>
    )}
  </Flex>
)

Splash.propTypes = {
  text: PropTypes.string
}

export default Splash
