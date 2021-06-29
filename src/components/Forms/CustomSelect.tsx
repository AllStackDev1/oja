/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import PropTypes from 'prop-types'
import {
  Select,
  FormLabel,
  SelectProps,
  FormControl,
  FormErrorMessage
} from '@chakra-ui/react'

interface ICustomSelect extends SelectProps {
  touched: boolean
  error?: string
  label?: string
  valueKey?: string
  labelKey?: string
  options: Array<any>
}

const CustomSelect: React.FC<ICustomSelect> = ({
  id,
  label,
  error,
  touched,
  options,
  isRequired,
  valueKey = '',
  labelKey = '',
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
      <Select {...rest}>
        {options?.map(e => (
          <option key={e[valueKey] || e} value={e[valueKey] || e}>
            {e[labelKey] || e}
          </option>
        ))}
      </Select>
      <FormErrorMessage fontSize={{ base: 'xs', lg: 'sm' }}>
        {error}
      </FormErrorMessage>
    </FormControl>
  )
}

CustomSelect.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  error: PropTypes.string,
  touched: PropTypes.bool.isRequired,
  labelKey: PropTypes.string,
  isRequired: PropTypes.bool,
  valueKey: PropTypes.string,
  options: PropTypes.array.isRequired
}

export default CustomSelect
