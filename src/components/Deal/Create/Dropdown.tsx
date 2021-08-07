/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import {
  Box,
  Icon,
  Text,
  Input,
  Fade,
  Button,
  useDisclosure
} from '@chakra-ui/react'
import { FaAngleDown, FaAngleUp } from 'react-icons/fa'

interface IProps {
  optionDisplay: React.FC<Record<string, string> | any>
  options: Record<string, string>[]
  onSelect(e: Record<string, string> | string): void
}

const Dropdown: React.FC<IProps> = ({
  options,
  onSelect,
  optionDisplay
}): JSX.Element => {
  const [data, setData] = React.useState<Record<string, string>[]>([])
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
      <Button
        w="full"
        bgColor="transparent"
        onClick={handleClick}
        _focus={{ outline: 'none' }}
        _hover={{ bgColor: 'transparent' }}
        rightIcon={<Icon as={isOpen ? FaAngleUp : FaAngleDown} boxSize={5} />}
      >
        <Text as="span" fontSize="lg" fontWeight={700}>
          Select...
        </Text>
      </Button>
      <Fade in={isOpen}>
        {isOpen && (
          <Box
            mt={2}
            h={44}
            w={80}
            shadow="md"
            zIndex={10}
            rounded="md"
            right={0}
            pos="absolute"
            borderWidth={1}
            bgColor="ojaDark"
            overflowY="scroll"
            borderColor="gray.100"
            onMouseLeave={() => isOpen && onClose()}
          >
            <Box as="ul">
              <Input
                h={14}
                type="text"
                rounded="0"
                value={value}
                color="ojaDark"
                bgColor="white"
                name="search-input"
                borderTopRadius="md"
                placeholder="Search..."
                onChange={handleSearch}
              />
              {data.map((o, idx) => (
                <Text
                  px={4}
                  py={2}
                  as="li"
                  d="flex"
                  key={idx}
                  role="button"
                  alignItems="center"
                  onClick={() => {
                    onSelect(o)
                    onClose()
                  }}
                  _hover={{ bgColor: 'ojaSkyBlue' }}
                >
                  {optionDisplay({ ...o, onClose })}
                </Text>
              ))}
            </Box>
          </Box>
        )}
      </Fade>
    </Box>
  )
}

export default Dropdown
