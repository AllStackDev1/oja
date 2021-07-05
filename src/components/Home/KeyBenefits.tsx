import React from 'react'
import { Box, Icon, Flex, Text, Container, Heading } from '@chakra-ui/react'

import Illustration from 'assets/images/illustration-1.png'
import { DiamondIcon } from 'components/SVG'

const KeyBenefitsSection = (): JSX.Element => {
  const keys = [
    {
      title: 'Lorem Ipsum 1',
      text: `Ut enim ad minim veniam, quis nostrud exercitation ullamco
      laboris nisi ut aliquip ex ea commodo consequat. Duis aute`
    },
    {
      title: 'Lorem Ipsum 2',
      text: `Ut enim ad minim veniam, quis nostrud exercitation ullamco
      laboris nisi ut aliquip ex ea commodo consequat. Duis aute`
    },
    {
      title: 'Lorem Ipsum 3',
      text: `Ut enim ad minim veniam, quis nostrud exercitation ullamco
      laboris nisi ut aliquip ex ea commodo consequat. Duis aute`
    },
    {
      title: 'Lorem Ipsum 4',
      text: `Ut enim ad minim veniam, quis nostrud exercitation ullamco
      laboris nisi ut aliquip ex ea commodo consequat. Duis aute`
    }
  ]
  return (
    <Container
      maxW="7xl"
      pos="relative"
      paddingInline={0}
      py={{ base: 8, lg: 14 }}
    >
      <Box className="section-two-div-curved" />
      <Flex
        mx={{ xl: 28 }}
        align="center"
        flexDir={{ base: 'column', lg: 'row' }}
        justify={{ lg: 'space-between' }}
      >
        <Box w={125}>
          <Box my={{ xl: 5 }}>
            <Heading
              fontWeight={600}
              letterSpacing="-0.6px"
              fontSize={{ xl: 28 }}
            >
              Key Benefits of Oj’a
            </Heading>

            {keys.map((k, i) => (
              <Flex key={i} justify="space-between" my={{ xl: i ? 14 : 10 }}>
                <Flex
                  h={16}
                  w={16}
                  rounded="full"
                  align="center"
                  justify="center"
                  bgColor="rgba(224, 250, 248, 0.2)"
                >
                  <Icon as={DiamondIcon} boxSize={10} />
                </Flex>
                <Box w={{ xl: '85%' }}>
                  <Heading
                    as="h6"
                    fontWeight={500}
                    letterSpacing="-0.2px"
                    fontSize={{ xl: 20 }}
                  >
                    {k.title}
                  </Heading>
                  <Text fontSize="sm" lineHeight="170%" letterSpacing="0.36px">
                    {k.text}
                  </Text>
                </Box>
              </Flex>
            ))}
          </Box>
        </Box>
        <Box>
          <Box
            bgImage={`url(${Illustration})`}
            bgSize="contain"
            bgRepeat="no-repeat"
            w={110}
            h={115}
          />
        </Box>
      </Flex>
    </Container>
  )
}

export default KeyBenefitsSection
