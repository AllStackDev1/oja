import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  Box,
  Flex,
  Link,
  Icon,
  Grid,
  Tooltip,
  GridItem
} from '@chakra-ui/react'

import { HomeIcon, VendToIcon } from 'components/SVG'
import { IoMdHelpCircle } from 'react-icons/io'
import UserMenu from '../Navbar/UserMenu'

const Sidebar = (): JSX.Element => {
  const menus = [
    {
      link: '/dashboard/deals',
      icon: HomeIcon
    },
    {
      link: '/dashboard/create-deal',
      icon: VendToIcon
    }
    // {
    //   link: '/dashboard/wallet',
    //   icon: WalletIcon
    // }
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
              bg="ojaSkyBlue"
              placement="right-end"
            >
              <Box>
                <Icon as={IoMdHelpCircle} boxSize={6} />
              </Box>
            </Tooltip>
            <Box my={2} />
            <UserMenu />
          </Flex>
        </Flex>
      </Flex>
    </Box>
  )
}

export default Sidebar
