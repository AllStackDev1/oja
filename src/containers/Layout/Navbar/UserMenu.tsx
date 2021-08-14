/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import {
  Icon,
  Flex,
  Link,
  Avatar,
  Divider,
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
  Placement
} from '@chakra-ui/react'
import useAuth from 'context/Auth'
import { NavLink, useLocation } from 'react-router-dom'
import { FaHome, FaUserAlt, FaUserCog, FaSignOutAlt } from 'react-icons/fa'

interface IProps {
  w?: number | string
  placement?: Placement
}

const UserMenu: React.FC<IProps> = ({ placement, w }): JSX.Element => {
  const { onOpen, onClose, isOpen } = useDisclosure()
  const { isAuthenticated } = useAuth()
  const { pathname } = useLocation()
  const user = isAuthenticated().user

  const menus = [
    {
      id: 0,
      title: '@' + user?.username,
      icon: FaUserAlt,
      link: '#'
    },
    {
      id: 1,
      icon: FaHome,
      title: pathname === '/' ? 'Dashboard' : 'Home',
      link: pathname === '/' ? '/dashboard/deals' : '/'
    },
    {
      id: 2,
      title: 'Profile',
      icon: FaUserCog,
      link: '#'
      // link: '/auth/profile'
    },
    {
      id: 3,
      title: 'Logout',
      icon: FaSignOutAlt,
      link: '/auth/logout'
    }
  ]

  return (
    <Popover
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      closeOnBlur={false}
      placement={placement || 'right'}
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
        w={w || 44}
        zIndex={100}
        color="ojaDark"
        _focus={{ outline: 'none' }}
      >
        <PopoverArrow />
        {menus.map((um, i) => (
          <React.Fragment key={um.id}>
            <Link as={NavLink} to={um.link} _hover={{ textDecor: 'none' }}>
              <Flex
                p={2}
                alignItems="center"
                roundedTop={i === 0 ? 'md' : ''}
                roundedBottom={menus.length === i + 1 ? 'md' : ''}
                cursor="pointer"
                _hover={{
                  textDecor: 'none',
                  color: 'white',
                  bg: 'ojaDark'
                }}
              >
                <Icon as={um.icon} mr={2} />
                {um.title}
              </Flex>
            </Link>
            {menus.length !== i + 1 && <Divider />}
          </React.Fragment>
        ))}
      </PopoverContent>
    </Popover>
  )
}

export default UserMenu
