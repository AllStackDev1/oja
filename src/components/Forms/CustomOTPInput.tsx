import React from 'react'
import PropTypes from 'prop-types'
import OtpInput from 'react-otp-input'
import { Box, Text } from '@chakra-ui/react'

interface ICustomOTPInput {
  mt?: string | number
  value?: string
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
        errorStyle={{ borderColor: 'var(--chakra-colors-red-500)' }}
        containerStyle={{ justifyContent: 'space-around' }}
        {...rest}
      />
      {!!error && (
        <Text mt={3} fontSize="xs" color="red.500">
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
