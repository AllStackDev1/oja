import React from 'react'
import PropTypes from 'prop-types'
import ReactFlagsSelect from 'react-flags-select'
import { Box, Icon, Input, InputProps } from '@chakra-ui/react'

import { phoneInputData } from 'utils/helpers'
import { CustomInputGroup } from '.'
import { FiSmartphone } from 'react-icons/fi'

interface CustomPhoneInput extends InputProps {
  error?: string
  label?: string
  touched: boolean
  selectedCountry: string
  setFieldValue(e: string, i: string): void
  setSelectedCountry(e: string): void
}

const CustomPasswordInput: React.FC<CustomPhoneInput> = ({
  selectedCountry,
  setFieldValue,
  setSelectedCountry,
  ...rest
}) => {
  const { countries, customLabels, data } = phoneInputData()

  return (
    <CustomInputGroup
      onChange={e => {
        setFieldValue(
          e.target.id,
          [
            data[selectedCountry].dialCode,
            e.target.value.replace(/^0+/, '').replace(/\s/g, '')
          ].join('')
        )
      }}
      leftAddon={
        <>
          <Icon as={FiSmartphone} />
          <Input
            ml={2}
            px={0}
            w={12}
            h="full"
            readOnly
            border="0"
            type="text"
            rounded={0}
            id="dialCode"
            color="gray.500"
            cursor="default"
            _focus={{ outline: 'none' }}
            _hover={{ outline: 'none' }}
            value={data[selectedCountry].dialCode}
          />
        </>
      }
      rightAddon={
        <Box color="white">
          <ReactFlagsSelect
            selected={selectedCountry}
            className="menu-flags"
            countries={countries}
            customLabels={customLabels}
            showSelectedLabel={false}
            onSelect={code => setSelectedCountry(code)}
            selectButtonClassName="menu-flags-button"
          />
        </Box>
      }
      placeholder={data[selectedCountry].placeholder}
      {...rest}
    />
  )
}

CustomPasswordInput.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  selectedCountry: PropTypes.string.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  setSelectedCountry: PropTypes.func.isRequired,
  touched: PropTypes.bool.isRequired
}

export default CustomPasswordInput
