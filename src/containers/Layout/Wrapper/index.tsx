import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { Box, Icon, Flex } from '@chakra-ui/react'
import { FiChevronLeft } from 'react-icons/fi'

import CustomAlert from 'components/Auth/CustomAlert'

import Sidebar from '../Sidebar'
import useAuth from 'context/Auth'

interface IWrapper {
  href: string
  title: string
  content: string
}

const Wrapper: React.FC<IWrapper> = ({
  href,
  title,
  content,
  children
}): JSX.Element => {
  const { isAuthenticated } = useAuth()
  const { user } = isAuthenticated()
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={content} />
        <title>{title}</title>
        <link rel="canonical" href={href} />
      </Helmet>
      <Flex as="main" bgColor="white" fontFamily="body" overflowX="hidden">
        <Sidebar />
        <Box py={8} pl={10} ml={20} pos="relative" overflowY="scroll">
          {!user?.isEmailVerified && (
            <Box w={110} pos="absolute" zIndex={10} top={0} right={4}>
              <CustomAlert
                type="info"
                successMessage="Please confirm you email, check your inbox or junk a verification link was sent from OJA's team"
              />
            </Box>
          )}

          <Box pos="absolute">
            <Flex
              w={7}
              h={7}
              rounded="full"
              align="center"
              justify="center"
              bgColor="ojaDark"
            >
              <Icon as={FiChevronLeft} color="ojaSkyBlue" />
            </Flex>
          </Box>
          {children}
        </Box>
      </Flex>
    </>
  )
}

Wrapper.propTypes = {
  href: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired
}

export default Wrapper
