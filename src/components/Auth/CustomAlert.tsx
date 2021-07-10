import React from 'react'
import PropTypes from 'prop-types'
import {
  Alert,
  AlertIcon,
  AlertTitle,
  CloseButton,
  AlertDescription
} from '@chakra-ui/react'

type Status = 'info' | 'warning' | 'success' | 'error' | undefined

interface IProps {
  type?: Status
  desc?: string
  isAutoClearable?: boolean
  errorMessage?: string
  successMessage?: string
}

const CustomAlert: React.FC<IProps> = ({
  desc,
  type = 'info',
  errorMessage,
  successMessage,
  isAutoClearable = false
}) => {
  const [isVisible, setVisible] = React.useState(true)

  React.useEffect(() => {
    if (isAutoClearable) {
      const id = setTimeout(() => setVisible(false), 45000)
      return () => {
        clearTimeout(id)
      }
    }
  }, [isAutoClearable])

  return (
    <Alert mt={4} d={isVisible ? 'flex' : 'none'} status={type}>
      <AlertIcon />
      {(successMessage || errorMessage) && (
        <AlertTitle
          color={type ? '' : errorMessage ? 'red.600' : 'green.600'}
          mr={5}
        >
          {successMessage || errorMessage}
        </AlertTitle>
      )}
      {desc && <AlertDescription mr={5}>{desc}</AlertDescription>}
      <CloseButton
        position="absolute"
        right="8px"
        top="8px"
        onClick={() => setVisible(false)}
      />
    </Alert>
  )
}

CustomAlert.propTypes = {
  desc: PropTypes.any,
  errorMessage: PropTypes.any,
  successMessage: PropTypes.any
}

export default CustomAlert
