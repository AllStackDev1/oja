import React from 'react'
import { Flex, Text, Button, FlexProps } from '@chakra-ui/react'
import { IoIosRefresh } from 'react-icons/io'
import { Splash } from 'components/Loading'

interface Props extends FlexProps {
  text?: string
  error?: unknown
  refetch(): void
  isLoading: boolean
}

const ReloadCard: React.FC<Props> = ({
  text,
  error,
  refetch,
  isLoading,
  ...rest
}): JSX.Element => {
  return (
    <Flex {...rest}>
      <Flex
        fontSize="md"
        align="center"
        color="ojaDark"
        justify="center"
        textAlign="center"
        direction="column"
      >
        {isLoading && <Splash text={text} />}
        {!isLoading && error && (
          <>
            <Text ml={2}>Something went wrong</Text>
            <Button
              size="md"
              bg="ojaDark"
              color="white"
              fontSize={20}
              rounded="20px"
              variant="solid"
              onClick={() => refetch()}
              leftIcon={<IoIosRefresh />}
              _hover={{ bg: 'ojaDark' }}
            >
              <Text fontSize="md">Try again</Text>
            </Button>
          </>
        )}
      </Flex>
    </Flex>
  )
}

export default ReloadCard
