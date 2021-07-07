/* eslint-disable react/no-array-index-key */
import React from 'react'
import PropTypes from 'prop-types'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import {
  Box,
  Icon,
  Text,
  Flex,
  Link,
  Portal,
  Divider,
  Popover,
  PopoverBody,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger
} from '@chakra-ui/react'
import { IoIosArrowDropdown, IoIosArrowDropup } from 'react-icons/io'

const DropDown = ({ title, data, color, withLink, ...rest }) => {
  const router = useRouter()

  return (
    <Popover>
      {({ isOpen }) => (
        <>
          <PopoverTrigger>
            <Flex
              align="center"
              cursor="pointer"
              _focus={{ outline: 'none' }}
              style={
                isOpen || router.pathname.match(new RegExp(withLink, 'g'))
                  ? { color: '#C82B38' }
                  : {}
              }
              _hover={{ hover: 'none', color: color || 'cf.400' }}
              onClick={() => withLink && router.push(withLink)}
              {...rest}
            >
              <Text ml={2}>{title}</Text>
              <Box>
                <Icon
                  ml={1}
                  as={isOpen ? IoIosArrowDropup : IoIosArrowDropdown}
                  boxSize={4}
                />
              </Box>
            </Flex>
          </PopoverTrigger>
          <Portal>
            <PopoverContent
              bgColor="white"
              shadow="2xl"
              border="0"
              borderTop="1px"
              borderTopColor="gray.400"
              width={{ lg: 60 }}
              _focus={{ outline: 'none' }}
            >
              <PopoverArrow
                borderLeft="1px"
                borderTop="1px"
                borderColor="gray.500"
              />
              <PopoverBody p={0}>
                {data.map((item, i) => (
                  <React.Fragment key={i}>
                    <Box
                      py={4}
                      px={4}
                      cursor="pointer"
                      _hover={{
                        textDecor: 'none',
                        color: 'white',
                        bg: color
                      }}
                    >
                      {item.link && (
                        <NextLink href={item.link} passHref>
                          <Link d="block" _hover={{ textDecor: 'none' }}>
                            {item.title}
                          </Link>
                        </NextLink>
                      )}
                      {item.action && (
                        <Text d="block" onClick={item.action}>
                          {item.title}
                        </Text>
                      )}
                    </Box>
                    {data.length !== i + 1 && <Divider />}
                  </React.Fragment>
                ))}
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </>
      )}
    </Popover>
  )
}

DropDown.propTypes = {
  title: PropTypes.string,
  data: PropTypes.array,
  color: PropTypes.string,
  withLink: PropTypes.string
}

export default DropDown
