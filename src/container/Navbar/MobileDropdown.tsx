import React from 'react'
import PropTypes from 'prop-types'
import { Flex, Link } from '@chakra-ui/react'

interface IItem {
  id: number
  link?: string
  title: string
}

interface Props {
  item: IItem
  toggleMenu(): void
}

const MobileDropdown: React.FC<Props> = ({ item, toggleMenu }) => {
  return (
    <Flex
      align="center"
      py={4}
      borderBottomWidth={1}
      borderBottomColor="gray.200"
      _last={{ borderBottomWidth: 0 }}
      _first={{ borderTopWidth: 1 }}
    >
      <Link
        href={item.link}
        _hover={{ textDecor: 'none' }}
        d="block"
        onClick={() => toggleMenu()}
      >
        {item.title}
      </Link>
    </Flex>
  )
}

MobileDropdown.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired
  }).isRequired,
  toggleMenu: PropTypes.func.isRequired
}

export default MobileDropdown
