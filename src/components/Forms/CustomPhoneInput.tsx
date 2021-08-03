import React, { ChangeEvent } from 'react'
import { Country } from 'countries-list'
import {
  Box,
  Text,
  Icon,
  Fade,
  Input,
  Button,
  useDisclosure,
  InputProps
} from '@chakra-ui/react'
import { FaAngleDown, FaAngleUp } from 'react-icons/fa'

import { CustomInputGroup } from '.'
import { FiSmartphone } from 'react-icons/fi'

interface CustomPhoneInput extends InputProps {
  error?: string
  label?: string
  touched: boolean
  data: Record<string, Country>
  countryId?: string
  selectedCountry: Country
  setSelectedCountry(e: Country): void
  setFieldValue(e: string, i: string): void
  setFieldTouched(e: string, i: boolean): void
  handleCheck(e: string, v: string): void
}

const CustomPasswordInput: React.FC<CustomPhoneInput> = ({
  data,
  countryId,
  handleCheck,
  setFieldValue,
  setFieldTouched,
  selectedCountry,
  setSelectedCountry,
  ...rest
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [countries, setCountries] = React.useState<Country[]>([])
  const [value, setValue] = React.useState<string>('')

  React.useEffect(() => {
    setCountries(Object.values(data))
  }, [data])

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const initialData = Object.values(data)
    let _value = event.target.value ? event.target.value : ''
    setValue(_value)
    _value = _value.trim().toLowerCase()
    let filtered = []
    if (_value) {
      filtered = initialData.filter(item => {
        const columnData = item.name?.toLowerCase()
        return !!columnData?.match(new RegExp(_value, 'i'))
      })
    } else {
      filtered = JSON.parse(JSON.stringify(initialData))
    }
    setCountries(filtered)
  }

  const handleClick = () => {
    setValue('')
    setCountries(Object.values(data))
  }

  return (
    <CustomInputGroup
      onBlur={e => {
        setFieldTouched(e.target.id, true)
        const val = [
          '+',
          selectedCountry?.phone,
          e.target.value.replace(/^0+/, '').replace(/\s/g, '')
        ].join('')
        handleCheck(e.target.name, val)
      }}
      onChange={e => {
        countryId && setFieldValue(countryId, selectedCountry.name)
        setFieldValue(
          e.target.id,
          [
            '+',
            selectedCountry?.phone,
            e.target.value.replace(/^0+/, '').replace(/\s/g, '')
          ].join('')
        )
      }}
      leftAddon={
        <>
          <Icon as={FiSmartphone} />
          <Input
            ml={2}
            px={0}
            w={12}
            h="full"
            readOnly
            border="0"
            type="text"
            rounded={0}
            id="dialCode"
            color="gray.500"
            cursor="default"
            _focus={{ outline: 'none' }}
            _hover={{ outline: 'none' }}
            value={'+' + selectedCountry.phone}
          />
        </>
      }
      rightAddon={
        <Box color="white" pos="relative">
          <Button
            w="full"
            rounded={0}
            h={rest.h}
            bgColor="transparent"
            onClick={() => {
              handleClick()
              !isOpen ? onOpen() : onClose()
            }}
            _focus={{ outline: 'none' }}
            _hover={{ bgColor: 'transparent' }}
            rightIcon={
              <Icon
                as={isOpen ? FaAngleUp : FaAngleDown}
                boxSize={5}
                color="ojaDark"
              />
            }
          >
            <Text as="span" ml={2} fontSize="4xl">
              {selectedCountry.emoji}
            </Text>
          </Button>
          <Fade in={isOpen}>
            {isOpen && (
              <Box
                mt={2}
                w={80}
                height={44}
                shadow="md"
                zIndex={10}
                rounded="md"
                pos="absolute"
                borderWidth={1}
                bgColor="ojaDark"
                overflowY="scroll"
                overflowX="hidden"
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
                  {countries.map(o => (
                    <Text
                      px={4}
                      py={2}
                      as="li"
                      d="flex"
                      id={o.name}
                      key={o.name}
                      role="button"
                      onClick={() => {
                        setSelectedCountry(o)
                        onClose()
                      }}
                      _hover={{ bgColor: 'ojaSkyBlue' }}
                    >
                      <Text as="span" fontSize="2xl">
                        {o.emoji}
                      </Text>
                      <Text as="span" ml={2} fontSize="lg" fontWeight={700}>
                        {o.name}
                      </Text>
                    </Text>
                  ))}
                </Box>
              </Box>
            )}
          </Fade>
        </Box>
      }
      placeholder="Enter number..."
      {...rest}
    />
  )
}

export default CustomPasswordInput
