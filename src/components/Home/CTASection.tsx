import React from 'react'
import { Box, Text, Button, Container } from '@chakra-ui/react'

import Illustration from 'assets/images/illustration-2.png'

const CTASection = (): JSX.Element => {
  return (
    <Container maxW="5xl" paddingInline={0} py={{ base: 8, lg: 14 }}>
      <Box
        w="full"
        h="full"
        bgSize="contain"
        bgRepeat="no-repeat"
        borderRadius="0 0 15% 15%"
        backgroundBlendMode="darken"
        bgImage={`url(${Illustration})`}
        bgColor="rgba(224, 250, 248, 0.2)"
      >
        <Box p={{ xl: 24 }}>
          <Box
            py={{ xl: 20 }}
            px={{ xl: 28 }}
            bgColor="white"
            textAlign="center"
            borderRadius="0 0 15% 15%"
          >
            <Text fontSize="28" lineHeight="42px" letterSpacing="-0.6px">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s,
            </Text>

            <Box mt={{ xl: 10 }}>
              <Button
                px={10}
                rounded="sm"
                color="white"
                h={{ md: 14 }}
                fontWeight={600}
                bgColor="ojaGreen"
                _focus={{ outline: 'none' }}
                _hover={{ bgColor: 'ojaGreen' }}
                fontSize={{ base: 'sm', xl: 'md' }}
              >
                Read More
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  )
}

export default CTASection
