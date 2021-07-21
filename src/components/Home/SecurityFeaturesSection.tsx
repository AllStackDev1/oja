import React from 'react'
import { Fade } from 'react-awesome-reveal'
import {
  Box,
  Icon,
  Flex,
  Text,
  Grid,
  Heading,
  Container,
  GridItem
} from '@chakra-ui/react'
import { MdLockOutline, MdSecurity } from 'react-icons/md'

const SecurityFeaturesSection = (): JSX.Element => {
  const keys = [
    {
      title: 'Lorem Ipsum 1',
      icon: MdLockOutline,
      text: `Ut enim ad minim veniam, quis nostrud exercitation ullamco
      laboris nisi ut aliquip ex ea commodo consequat. Duis aute`
    },
    {
      title: 'Lorem Ipsum 2',
      icon: MdSecurity,
      text: `Ut enim ad minim veniam, quis nostrud exercitation ullamco
      laboris nisi ut aliquip ex ea commodo consequat. Duis aute`
    },
    {
      title: 'Lorem Ipsum 3',
      icon: MdLockOutline,
      text: `Ut enim ad minim veniam, quis nostrud exercitation ullamco
      laboris nisi ut aliquip ex ea commodo consequat. Duis aute`
    },
    {
      title: 'Lorem Ipsum 4',
      icon: MdSecurity,
      text: `Ut enim ad minim veniam, quis nostrud exercitation ullamco
      laboris nisi ut aliquip ex ea commodo consequat. Duis aute`
    }
  ]
  return (
    <Container maxW="5xl" paddingInline={0} py={{ base: 8, lg: 14 }}>
      <Heading
        textAlign="center"
        fontWeight={600}
        letterSpacing="-0.6px"
        fontSize={{ xl: 28 }}
      >
        Security Features
      </Heading>

      <Grid mt={{ xl: 16 }} gap={8} templateColumns={{ xl: 'repeat(2, 1fr)' }}>
        <Fade cascade>
          {keys.map(k => (
            <GridItem key={k.title} w={{ xl: 115 }}>
              <Flex
                h={16}
                w={16}
                rounded="full"
                align="center"
                justify="center"
                bgColor="rgba(224, 250, 248, 0.2)"
              >
                <Icon as={k.icon} boxSize={10} />
              </Flex>
              <Box mt={{ xl: 5 }}>
                <Heading
                  as="h6"
                  mb={{ xl: 2 }}
                  fontWeight={500}
                  letterSpacing="-0.2px"
                  fontSize={{ xl: 20 }}
                >
                  {k.title}
                </Heading>
                <Text
                  fontWeight={300}
                  fontSize="sm"
                  lineHeight="160%"
                  letterSpacing="0.2px"
                >
                  {k.text}
                </Text>
              </Box>
            </GridItem>
          ))}
        </Fade>
      </Grid>
    </Container>
  )
}

export default SecurityFeaturesSection
