import React from 'react'
import {
  Box,
  Icon,
  Flex,
  Button,
  Text,
  Container,
  Heading
} from '@chakra-ui/react'

import Illustration from 'assets/images/illustration-1.png'
import { DiamondIcon } from 'components/SVG'

const Section = (): JSX.Element => {
  return (
    <Container
      d="flex"
      maxW="5xl"
      paddingInline={0}
      alignItems="center"
      py={{ base: 8, lg: 14 }}
      flexDir={{ base: 'column', lg: 'row' }}
      justifyContent={{ lg: 'space-between' }}
    >
      <Box>
        <Box
          bgImage={`url(${Illustration})`}
          bgSize="contain"
          bgRepeat="no-repeat"
          w={110}
          h={115}
        />
      </Box>
      <Box w={112}>
        <Flex
          h={14}
          w={14}
          bgColor="rgba(224, 250, 248, 0.2)"
          rounded="full"
          align="center"
          justify="center"
        >
          <Icon as={DiamondIcon} boxSize={8} />
        </Flex>
        <Box my={{ xl: 5 }} pr={{ xl: 6 }}>
          <Heading
            mb={{ xl: 3 }}
            fontWeight={600}
            fontSize={{ xl: '1.75rem' }}
            letterSpacing="-0.6px"
          >
            Lorem ipsum dolor sit ame
          </Heading>
          <Text fontSize="sm" lineHeight="170%" letterSpacing="0.36px">
            Deed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt.
          </Text>
        </Box>
        <Button
          px={10}
          rounded="sm"
          h={{ md: 14 }}
          borderColor="gray.900"
          fontWeight={600}
          variant="outline"
          _focus={{ outline: 'none' }}
          fontSize={{ base: 'sm', xl: 'md' }}
        >
          Read More
        </Button>
      </Box>
    </Container>
  )
}

export default Section
