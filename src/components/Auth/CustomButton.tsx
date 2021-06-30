import React from 'react'
import PropTypes from 'prop-types'
import { Button, ButtonProps } from '@chakra-ui/react'

const CustomButton: React.FC<ButtonProps> = ({ title, ...props }) => {
  return (
    <Button
      rounded="sm"
      h={{ xl: '54' }}
      fontWeight={600}
      letterSpacing="0.36px"
      _focus={{ outline: 'none' }}
      justifyContent="space-between"
      {...props}
    >
      {title}
    </Button>
  )
}

CustomButton.propTypes = {
  title: PropTypes.string.isRequired
}

export default CustomButton
