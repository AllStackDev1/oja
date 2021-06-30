import React from 'react'
import PropTypes from 'prop-types'
import {
  Input,
  InputProps,
  FormLabel,
  FormControl,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  FormErrorMessage
} from '@chakra-ui/react'

interface ICustomInputGroup extends InputProps {
  error?: string
  label?: string
  touched: boolean
  leftAddon?: any
  rightAddon?: any
}

const CustomInputGroup: React.FC<ICustomInputGroup> = ({
  id,
  error,
  label,
  touched,
  isRequired,
  leftAddon,
  rightAddon,
  ...rest
}) => {
  const addonProps = {
    h: rest.h,
    rounded: 0,
    border: 0,
    bgColor: 'white'
  }

  return (
    <FormControl
      id={id || rest.name}
      isRequired={isRequired}
      isInvalid={!!error && touched}
    >
      {label && (
        <FormLabel fontSize={'xs'} fontWeight="400">
          {label}
        </FormLabel>
      )}
      <InputGroup borderBottom="1px" borderBottomColor="gray.400">
        {leftAddon && <InputLeftAddon {...addonProps} children={leftAddon} />}
        <Input {...rest} />
        {rightAddon && (
          <InputRightAddon {...addonProps} children={rightAddon} />
        )}
      </InputGroup>
      <FormErrorMessage fontSize={{ base: 'xs', lg: 'sm' }}>
        {error}
      </FormErrorMessage>
    </FormControl>
  )
}

CustomInputGroup.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  isRequired: PropTypes.bool,
  leftAddon: PropTypes.any,
  rightAddon: PropTypes.any,
  id: PropTypes.string.isRequired,
  touched: PropTypes.bool.isRequired
}

export default CustomInputGroup
