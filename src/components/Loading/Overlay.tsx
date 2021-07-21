import React from 'react'
import PropTypes from 'prop-types'
import { Box, Flex, Text, Spinner, Slide } from '@chakra-ui/react'

interface Props {
  text?: string
}

const Overlay: React.FC<Props> = ({ text }): JSX.Element => {
  return (
    <Slide direction="top" in={true} style={{ zIndex: 100 }}>
      <Box pos="fixed" width="100vw" bg="rgba(0,0,0,0.5)">
        <Flex direction="column" align="center" justify="center" h="100vh">
          <Spinner
            thickness="4px"
            speed="0.65s"
            size="md"
            emptyColor="gray.200"
            color="gray.500"
          />
          {text && (
            <Text
              color="white"
              textAlign="center"
              className="loading-text loading-text-b"
            >
              {text}
            </Text>
          )}
        </Flex>
      </Box>
    </Slide>
  )
}

Overlay.propTypes = {
  text: PropTypes.string
}

export default Overlay
