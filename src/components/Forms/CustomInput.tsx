import React from 'react'
import PropTypes from 'prop-types'
import {
  Input,
  InputProps,
  FormLabel,
  FormControl,
  FormErrorMessage
} from '@chakra-ui/react'

interface ICustomInput extends InputProps {
  touched?: boolean
  error?: string
  label?: string
}

const CustomInput: React.FC<ICustomInput> = ({
  id,
  error,
  label,
  touched,
  isRequired,
  ...rest
}) => {
  return (
    <FormControl
      id={id || rest.name}
      isRequired={isRequired}
      isInvalid={!!error && touched}
    >
      {label && (
        <FormLabel fontSize={{ base: 'xs', lg: 'sm' }} fontWeight="400">
          {label}
        </FormLabel>
      )}
      <Input {...rest} />
      <FormErrorMessage fontSize={{ base: 'xs', lg: 'sm' }}>
        {error}
      </FormErrorMessage>
    </FormControl>
  )
}

CustomInput.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  touched: PropTypes.bool,
  isRequired: PropTypes.bool,
  id: PropTypes.string.isRequired
}

export default CustomInput
