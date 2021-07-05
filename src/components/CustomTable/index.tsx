import React from 'react'
import PropTypes from 'prop-types'
import {
  Tr,
  Th,
  Td,
  Icon,
  Flex,
  Text,
  Table,
  Thead,
  Tbody
} from '@chakra-ui/react'
import { useTable } from 'react-table'
import { EmptyTableIcon } from 'components/SVG'

interface ICustomTable {
  columns: any[]
  data: any[]
  name: string
  variant?: string
}

const CustomTable: React.FC<ICustomTable> = ({
  name,
  data,
  variant,
  columns
}): JSX.Element => {
  const _data = React.useMemo(() => data, [data])
  const _columns = React.useMemo(() => columns, [columns])

  const tableInstance = useTable({ columns: _columns, data: _data })

  const { rows, prepareRow, headerGroups, getTableProps, getTableBodyProps } =
    tableInstance

  return (
    <Table variant={variant} {...getTableProps()}>
      <Thead>
        {headerGroups.map(headerGroup => (
          <Tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <Th
                py={5}
                fontSize="xs"
                fontFamily="body"
                fontWeight={300}
                textTransform="capitalize"
                {...column.getHeaderProps()}
              >
                {column.render('Header')}
              </Th>
            ))}
          </Tr>
        ))}
      </Thead>
      <Tbody {...getTableBodyProps()}>
        {!_data?.length ? (
          <Tr>
            <Td py={32} colSpan={7} color="gray.400" textAlign="center">
              <Flex flexDir="column" justify="center" align="center">
                <Icon as={EmptyTableIcon} boxSize={10} />
                <Text mt={10}>There are no {name} yet</Text>
              </Flex>
            </Td>
          </Tr>
        ) : (
          rows.map(row => {
            prepareRow(row)
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <Td fontSize="sm" {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </Td>
                  )
                })}
              </Tr>
            )
          })
        )}
      </Tbody>
    </Table>
  )
}

CustomTable.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  variant: PropTypes.string,
  name: PropTypes.string.isRequired
}

export default CustomTable
