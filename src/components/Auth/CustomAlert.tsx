import React from 'react'
import PropTypes from 'prop-types'
import { Fade } from 'react-awesome-reveal'
import {
  Box,
  Alert,
  AlertIcon,
  AlertTitle,
  CloseButton,
  AlertDescription,
  LayoutProps,
  PositionProps
} from '@chakra-ui/react'

type Status = 'info' | 'warning' | 'success' | 'error' | undefined

interface IProps extends LayoutProps, PositionProps {
  type?: Status
  desc?: string
  isAutoClearable?: boolean
  errorMessage?: string
  successMessage?: string
}

const CustomAlert: React.FC<IProps> = ({
  desc,
  errorMessage,
  type = 'info',
  successMessage,
  isAutoClearable = false,
  ...rest
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
    <Box {...rest} zIndex={10}>
      <Fade direction="up">
        <Alert
          mt={4}
          zIndex={10}
          rounded="md"
          status={type}
          boxShadow="md"
          d={isVisible ? 'flex' : 'none'}
        >
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
      </Fade>
    </Box>
  )
}

CustomAlert.propTypes = {
  desc: PropTypes.any,
  errorMessage: PropTypes.any,
  successMessage: PropTypes.any
}

export default CustomAlert
