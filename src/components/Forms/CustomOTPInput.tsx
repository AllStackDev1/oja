import React from 'react'
import PropTypes from 'prop-types'
import OtpInput from 'react-otp-input'
import { Box, Text } from '@chakra-ui/react'

interface ICustomOTPInput {
  mt?: any
  value?: any
  isDisabled: boolean
  error?: string
  onChange(e: string): void
}

const CustomOTPInput: React.FC<ICustomOTPInput> = ({
  mt,
  error,
  ...rest
}): JSX.Element => {
  return (
    <Box mx="auto" my={mt} w={{ base: '100%', lg: 120 }}>
      <OtpInput
        isInputNum
        numInputs={6}
        shouldAutoFocus
        hasErrored={!!error}
        separator={<Text as="span"> </Text>}
        className="otp-input"
        errorStyle={{ borderColor: '#00D0BE' }}
        containerStyle={{ justifyContent: 'space-around' }}
        {...rest}
      />
      {error && (
        <Text
          align="left"
          mt={1}
          color="red.500"
          fontSize={{ base: 'xs', lg: 'sm' }}
        >
          {error}
        </Text>
      )}
    </Box>
  )
}

CustomOTPInput.propTypes = {
  mt: PropTypes.any,
  error: PropTypes.string
}

export default CustomOTPInput
