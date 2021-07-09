import React from 'react'
import PropTypes from 'prop-types'
import {
  Alert,
  AlertIcon,
  AlertTitle,
  CloseButton,
  AlertDescription
} from '@chakra-ui/react'

interface IProps {
  desc?: string
  errorMessage?: string
  successMessage?: string
}

const CustomAlert: React.FC<IProps> = ({
  desc,
  errorMessage,
  successMessage
}) => {
  const [isVisible, setVisible] = React.useState(true)

  React.useEffect(() => {
    const id = setTimeout(() => setVisible(false), 15000)
    return () => {
      clearTimeout(id)
    }
  }, [])

  return (
    <Alert
      mt={4}
      d={isVisible ? 'flex' : 'none'}
      status={errorMessage ? 'error' : 'success'}
    >
      <AlertIcon />
      <AlertTitle color={errorMessage ? 'red.600' : 'green.600'} mr={2}>
        {successMessage || errorMessage}
      </AlertTitle>
      {desc && (
        <AlertDescription>
          Your Chakra experience may be degraded.
        </AlertDescription>
      )}
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
