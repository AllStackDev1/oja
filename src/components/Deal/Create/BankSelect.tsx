import React from 'react'
import { Box, Icon, Text, Input, useDisclosure } from '@chakra-ui/react'
import { FaAngleDown, FaAngleUp } from 'react-icons/fa'
import { CustomInputGroup } from 'components/Forms'
import { IBank } from 'interfaces'

interface IProps {
  error?: string
  touched: boolean
  selected: IBank
  options: IBank[]
  onSelect(e: IBank): void
}

const BankSelect: React.FC<IProps> = ({
  options,
  selected,
  onSelect,
  ...rest
}): JSX.Element => {
  const [data, setData] = React.useState<IBank[]>([])
  const [value, setValue] = React.useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    let _value = event.target.value ? event.target.value : ''
    setValue(_value)
    _value = _value.trim().toLowerCase()
    let filtered = []
    if (_value) {
      filtered = data.filter(item => {
        const columnData = item.name?.toLowerCase()
        return !!columnData?.match(new RegExp(_value, 'i'))
      })
    } else {
      filtered = data
    }
    setData(filtered)
  }

  const handleClick = () => {
    setValue('')
    setData(options)
    !isOpen ? onOpen() : onClose()
  }

  return (
    <Box pos="relative">
      <CustomInputGroup
        {...rest}
        label="Bank"
        border={0}
        height={12}
        type="text"
        rounded={0}
        isReadOnly
        isRequired
        role="button"
        value={selected.name}
        onClick={handleClick}
        placeholder="Select Bank..."
        _focus={{ outline: 'none' }}
        rightAddon={<Icon as={isOpen ? FaAngleUp : FaAngleDown} boxSize={5} />}
      />
      {isOpen && (
        <Box
          mt={2}
          h={44}
          w="full"
          left={0}
          right={0}
          shadow="md"
          zIndex={100}
          rounded="0"
          pos="absolute"
          borderWidth={1}
          bgColor="ojaDark"
          overflowY="scroll"
          borderColor="gray.100"
          onMouseLeave={() => isOpen && onClose()}
        >
          <Box as="ul" w="full">
            <Input
              h={14}
              w="full"
              type="text"
              rounded="0"
              value={value}
              color="ojaDark"
              bgColor="white"
              name="search-input"
              placeholder="Search..."
              onChange={handleSearch}
            />
            {data.map((o, idx) => (
              <Text
                px={4}
                py={4}
                as="li"
                w="full"
                key={idx}
                role="button"
                listStyleType="none"
                onClick={() => {
                  onSelect(o)
                  onClose()
                }}
                _hover={{ bgColor: 'ojaSkyBlue' }}
              >
                <Text as="span" fontSize="lg" color="white" fontWeight={700}>
                  {o.name}
                </Text>
              </Text>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default BankSelect
