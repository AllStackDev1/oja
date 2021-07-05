import React from 'react'
// import PropTypes from 'prop-types'
import { Divider, Flex, Icon, Select } from '@chakra-ui/react'
import FilterIcon from 'components/SVG/FilterIcon'

const Filter = (): JSX.Element => {
  return (
    <Flex w={36} border="1px" rounded="md" borderColor="gray.200">
      <Flex role="button" boxSize={12} w={20} justify="center" align="center">
        <Icon as={FilterIcon} />
      </Flex>
      <Divider orientation="vertical" h={12} />
      <Select
        h={12}
        fontSize="sm"
        border="unset"
        _focus={{ outline: 'none' }}
        defaultValue=""
      >
        <option value="">All</option>
      </Select>
    </Flex>
  )
}

Filter.propTypes = {}

export default Filter
