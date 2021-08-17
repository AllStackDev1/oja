import React from 'react'
import {
  Box,
  Icon,
  Text,
  Flex,
  Button,
  useDisclosure,
  InputProps
} from '@chakra-ui/react'

import { CustomInput } from 'components/Forms'
import { ICurrency } from 'interface'
import { FaAngleDown, FaAngleUp } from 'react-icons/fa'

interface IInputFlag {
  input: InputProps
  select: {
    selected?: ICurrency
    options?: ICurrency[]
    onSelect(e: string): void
  }
}

const InputFlag: React.FC<IInputFlag> = (props): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { input, select } = props

  return (
    <Flex pos="relative" align="center" justify="space-between">
      <Box w={{ xl: '70%' }}>
        <CustomInput
          rounded={0}
          type="text"
          color="#000"
          bgColor="white"
          pl={{ xl: 10 }}
          lineHeight="150%"
          fontSize={{ xl: '2xl' }}
          h={{ base: 12, xl: '4.5rem' }}
          {...input}
        />
      </Box>
      <Box w={{ xl: '28%' }}>
        <Box pos="relative">
          <Button
            w="full"
            rounded={0}
            bgColor="ojaSkyBlue"
            borderEndRadius="md"
            onClick={() => (!isOpen ? onOpen() : onClose())}
            _focus={{ outline: 'none' }}
            h={{ base: 12, xl: '4.5rem' }}
            _hover={{ bgColor: 'ojaSkyBlue' }}
            rightIcon={
              <Icon as={isOpen ? FaAngleUp : FaAngleDown} boxSize={5} />
            }
          >
            <Text fontSize="3xl">{select?.selected?.flag}</Text>
            <Text as="span" ml={2} fontSize="lg" fontWeight={700}>
              {select?.selected?.code}
            </Text>
          </Button>
          {isOpen && (
            <Box
              mt={2}
              w="full"
              height={44}
              shadow="md"
              zIndex={10}
              rounded="md"
              pos="absolute"
              borderWidth={1}
              bgColor="ojaDark"
              overflowY="scroll"
              borderColor="gray.100"
              onMouseLeave={() => isOpen && onClose()}
            >
              <Box as="ul" onClick={() => null}>
                {select.options?.map(o => (
                  <Text
                    px={4}
                    py={2}
                    as="li"
                    d="flex"
                    key={o._id}
                    role="button"
                    alignItems="center"
                    onClick={() => {
                      select?.onSelect(o.code)
                      onClose()
                    }}
                    _hover={{ bgColor: 'ojaSkyBlue' }}
                  >
                    <Text fontSize="3xl" as="span">
                      {o?.flag}
                    </Text>
                    <Text as="span" ml={2} fontSize="lg" fontWeight={700}>
                      {o.code}
                    </Text>
                  </Text>
                ))}
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Flex>
  )
}

export default InputFlag
