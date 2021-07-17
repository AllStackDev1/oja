import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  Box,
  Flex,
  Link,
  Icon,
  Grid,
  Avatar,
  Popover,
  Tooltip,
  Divider,
  GridItem,
  PopoverArrow,
  useDisclosure,
  PopoverTrigger,
  PopoverContent
} from '@chakra-ui/react'

import { HomeIcon, VentToIcon, WalletIcon } from 'components/SVG'
import { IoMdHelpCircle } from 'react-icons/io'
import { FaUserCog, FaSignOutAlt } from 'react-icons/fa'
import useAuth from 'context/Auth'

const Sidebar = (): JSX.Element => {
  const { onOpen, onClose, isOpen } = useDisclosure()
  const { isAuthenticated } = useAuth()

  const { user } = isAuthenticated()

  const menus = [
    {
      link: 'deals',
      icon: HomeIcon
    },
    {
      link: 'create-deal',
      icon: VentToIcon
    },
    {
      link: 'wallet',
      icon: WalletIcon
    }
  ]

  const userMenus = [
    {
      id: 1,
      title: 'Profile',
      icon: FaUserCog,
      link: '#'
      // link: '/auth/profile'
    },
    {
      id: 2,
      title: 'Logout',
      icon: FaSignOutAlt,
      link: '/auth/logout'
    }
  ]

  return (
    <Box w="5%" as="aside" pos="fixed" bgColor="ojaDark" zIndex={100}>
      <Flex pos="relative" align="center" h="100vh" flexDir="column">
        <Grid mt={{ xl: 24 }} rowGap={6}>
          {menus.map(m => (
            <GridItem role="button" key={m.link}>
              <Link
                h={10}
                w={10}
                d="flex"
                to={m.link}
                as={NavLink}
                rounded="md"
                color="white"
                alignItems="center"
                justifyContent="center"
                _activeLink={{ bgColor: 'rgba(255, 255, 255, 0.2)' }}
                _hover={{ bgColor: 'rgba(255, 255, 255, 0.2)' }}
              >
                <Icon as={m.icon} />
              </Link>
            </GridItem>
          ))}
        </Grid>
        <Flex pos="absolute" bottom={20} color="white">
          <Flex flexDir="column" align="center" pos="relative">
            <Tooltip
              hasArrow
              label="Need Help?"
              bgColor="ojaSkyBlue"
              placement="right-end"
            >
              <Box>
                <Icon as={IoMdHelpCircle} boxSize={6} />
              </Box>
            </Tooltip>
            <Box my={2} />
            <Popover
              isOpen={isOpen}
              onOpen={onOpen}
              onClose={onClose}
              placement="right"
              closeOnBlur={false}
            >
              <PopoverTrigger>
                <Avatar
                  size="md"
                  cursor="pointer"
                  borderWidth={2}
                  borderColor="white"
                  name={user?.firstName + ' ' + user?.lastName}
                  src={user?.avatar}
                />
              </PopoverTrigger>
              <PopoverContent
                w={44}
                color="ojaDark"
                _focus={{ outline: 'none' }}
              >
                <PopoverArrow />
                {userMenus.map((um, i) => (
                  <React.Fragment key={um.id}>
                    <Box
                      p={2}
                      roundedTop={i === 0 ? 'md' : ''}
                      roundedBottom={userMenus.length === i + 1 ? 'md' : ''}
                      cursor="pointer"
                      _hover={{
                        textDecor: 'none',
                        color: 'white',
                        bg: 'ojaDark'
                      }}
                    >
                      <Link
                        as={NavLink}
                        to={um.link}
                        d="flex"
                        alignItems="center"
                        _hover={{ textDecor: 'none' }}
                      >
                        <Icon as={um.icon} mr={2} />
                        {um.title}
                      </Link>
                    </Box>
                    {userMenus.length !== i + 1 && <Divider />}
                  </React.Fragment>
                ))}
              </PopoverContent>
            </Popover>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  )
}

export default Sidebar
