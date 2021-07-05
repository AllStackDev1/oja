import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { Box, Icon, Flex } from '@chakra-ui/react'
import { FiChevronLeft } from 'react-icons/fi'

import Sidebar from '../Sidebar'

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

        <Box
          w="full"
          pos="relative"
          py={{ xl: 8 }}
          px={{ xl: 14 }}
          overflowX="scroll"
        >
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
