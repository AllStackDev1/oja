import React from 'react'
import { Flex, Box, Link, Text, Icon, Heading, Button } from '@chakra-ui/react'
import { RiArrowRightSFill } from 'react-icons/ri'
import { FiChevronsDown } from 'react-icons/fi'
import HeroForm from './HeroForm'

const Hero = (): JSX.Element => {
  return (
    <Box bg="ojaDark" color="white" pos="relative">
      <Flex
        pt={{ xl: 20 }}
        pos="relative"
        h={{ base: 95, lg: 'heroHeight' }}
        pl={{ md: '3.125rem', lg: 28 }}
        pr={{ md: '3.125rem', lg: 20 }}
        justify={{ base: 'space-around', xl: 'space-between' }}
      >
        <Box w="md">
          <Heading
            mb={{ lg: 6 }}
            fontWeight={600}
            lineHeight="98%"
            letterSpacing="-3px"
            fontSize={{ base: 'lg', xl: 64 }}
          >
            Social Currency Market
          </Heading>
          <Text
            fontSize={{ base: 'sm', xl: 'xl' }}
            lineHeight={{ lg: '140%' }}
            letterSpacing="-0.2px"
          >
            Instant pairing and exhchaging on our secure network
          </Text>
          <Flex mt={6} align="center">
            <Button
              px={10}
              rounded="sm"
              boxShadow="lg"
              h={{ lg: '3.375rem' }}
              colorScheme="ojaButton"
              fontWeight={700}
              fontSize={{ base: 'sm', xl: 'lg' }}
              _focus={{ outline: 'none' }}
            >
              Create a Vend
            </Button>
            <Box mx={5} />
            <Link
              href="/"
              rel="noreferrer"
              _hover={{ hover: 'none' }}
              _focus={{ outline: 'none' }}
            >
              <Flex
                pos="relative"
                align="center"
                role="button"
                color="ojaYellow"
              >
                <Text fontSize="2xl">See How</Text>
                <Icon
                  boxSize={30}
                  letterSpacing="-0.2px"
                  as={RiArrowRightSFill}
                  className="see-how-arrow"
                />
              </Flex>
            </Link>
          </Flex>
        </Box>
        <HeroForm />
      </Flex>
      <Flex
        flexDir="column"
        align="center"
        pos="absolute"
        bottom={20}
        justify="center"
        w="full"
      >
        <Text fontSize="sm" letterSpacing="-0.4px">
          Scroll here
        </Text>
        <Box mt={5} pos="relative">
          <Icon as={FiChevronsDown} role="button" className="scroll-arrow" />
        </Box>
      </Flex>
      <Box className="hero-curved-section" />
    </Box>
  )
}

export default Hero
