import React from 'react'
import PropTypes from 'prop-types'
import { IconButton } from '@chakra-ui/react'
import { FiEyeOff, FiEye } from 'react-icons/fi'

interface Props {
  show: boolean
  setShow: React.Dispatch<React.SetStateAction<boolean>>
}

const ButtonPasswordToggler: React.FC<Props> = ({
  show,
  setShow
}): JSX.Element => {
  return (
    <IconButton
      size="sm"
      h="1.75rem"
      bg="inheirt"
      type="button"
      _hover={{ bg: 'inheirt' }}
      _focus={{ outline: 'none' }}
      onClick={() => setShow(s => !s)}
      aria-label={show ? 'show' : 'hide'}
      // onClick={e => { e.preventDefault() setShow(s => !s) }}
      icon={show ? <FiEye fontSize={15} /> : <FiEyeOff fontSize={15} />}
    />
  )
}

ButtonPasswordToggler.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired
}

export default ButtonPasswordToggler
