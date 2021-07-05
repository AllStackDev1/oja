import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  Box,
  Flex,
  Link,
  Icon,
  Grid,
  Avatar,
  Tooltip,
  GridItem
} from '@chakra-ui/react'
import { HomeIcon, VentToIcon, WalletIcon } from 'components/SVG'
import { IoMdHelpCircle } from 'react-icons/io'

const Sidebar = (): JSX.Element => {
  const menus = [
    {
      link: 'home',
      icon: HomeIcon
    },
    {
      link: 'vent-to',
      icon: VentToIcon
    },
    {
      link: 'wallet',
      icon: WalletIcon
    }
  ]

  return (
    <Box w={24} as="aside" pos="fixed" bgColor="ojaDark">
      <Flex pos="relative" align="center" h="100vh" flexDir="column">
        <Grid mt={{ xl: 24 }} rowGap={6}>
          {menus.map(m => (
            <GridItem key={m.link}>
              <Link
                h={10}
                w={10}
                d="flex"
                to={m.link}
                as={NavLink}
                rounded="md"
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
        <Flex pos="absolute" bottom={48} color="white">
          <Flex flexDir="column" align="center" pos="relative">
            <Tooltip label="Need Help?" placement="right-end">
              <Box>
                <Icon as={IoMdHelpCircle} boxSize={6} />
              </Box>
            </Tooltip>
            <Box my={1} />
            <Avatar
              size="md"
              borderWidth={2}
              borderColor="white"
              name="Kola Tioluwani"
              src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
            />
          </Flex>
        </Flex>
      </Flex>
    </Box>
  )
}

export default Sidebar
