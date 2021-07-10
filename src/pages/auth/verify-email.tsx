import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { useQuery } from 'react-query'
import { BsCheckCircle } from 'react-icons/bs'
import { Link as ReactLink, RouteComponentProps } from 'react-router-dom'
import { Link, Flex, Box, Icon, Fade, Text, Heading } from '@chakra-ui/react'

import useApi from 'context/Api'
import Overlay from 'components/Loading/Overlay'

interface RouteParams {
  token: string
}

const VerifyEmail: React.FC<RouteComponentProps<RouteParams>> = ({
  match: {
    params: { token }
  },
  history
}): JSX.Element => {
  const { verifyEmail } = useApi()

  React.useEffect(() => {
    if (!token) {
      history.push('/auth/login')
    }
  }, [token])

  const { isLoading, error } = useQuery('', () => verifyEmail(token), {
    enabled: !!token
  })

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content="This is the application login page" />
        <title>Oja's | Email Verification</title>
        <link rel="canonical" href="/auth/login" />
      </Helmet>
      {isLoading && <Overlay text="Verifying email" />}
      <Flex justify="center" align="center" w="full" h="100vh" bgColor="white">
        {!isLoading && (
          <>
            {error ? (
              <Text>Error: {error}</Text>
            ) : (
              <Fade in={true}>
                <Box textAlign="center">
                  <Icon as={BsCheckCircle} color="ojaSkyBlue" boxSize={40} />
                  <Heading
                    textAlign="center"
                    fontWeight={600}
                    textColor="ojaDark"
                    fontSize="3xl"
                  >
                    Your email is now verified!!!
                  </Heading>
                  <Box mt={2}>
                    <Text mb={2} lineHeight="short" fontSize="sm">
                      Thank you for verifying your email address as this will
                      help you in securing your account even better.
                    </Text>

                    <Link p={2} as={ReactLink} to="/dashboard/home">
                      Go to Dashboard
                    </Link>
                  </Box>
                </Box>
              </Fade>
            )}
          </>
        )}
      </Flex>
    </>
  )
}

VerifyEmail.propTypes = {
  match: PropTypes.any.isRequired,
  history: PropTypes.any.isRequired
}

export default VerifyEmail
