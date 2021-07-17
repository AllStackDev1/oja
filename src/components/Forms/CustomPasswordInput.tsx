import React from 'react'
import PropTypes from 'prop-types'
import { Icon, IconButton, InputProps } from '@chakra-ui/react'
import { FiEyeOff, FiEye, FiLock } from 'react-icons/fi'
import { CustomInputGroup } from './'

interface ICustomPasswordInput extends InputProps {
  error?: string
  label?: string
  touched: boolean
}

const CustomPasswordInput: React.FC<ICustomPasswordInput> = props => {
  const [show, setShow] = React.useState(false)

  return (
    <CustomInputGroup
      isRequired
      type={show ? 'text' : 'password'}
      leftAddon={<Icon as={FiLock} />}
      rightAddon={
        <IconButton
          size="sm"
          h="1.75rem"
          bg="inherit"
          type="button"
          _hover={{ bg: 'inherit' }}
          _focus={{ outline: 'none' }}
          onClick={() => setShow(s => !s)}
          aria-label={show ? 'show' : 'hide'}
          // onClick={e => { e.preventDefault() setShowPassword(s => !s) }}
          icon={show ? <FiEye fontSize={15} /> : <FiEyeOff fontSize={15} />}
        />
      }
      {...props}
    />
  )
}

CustomPasswordInput.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  touched: PropTypes.bool.isRequired
}

export default CustomPasswordInput
