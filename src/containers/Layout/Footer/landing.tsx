/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import {
  Box,
  Icon,
  Flex,
  Link,
  Grid,
  Text,
  Button,
  Divider,
  Heading,
  GridItem,
  useToast,
  Container
} from '@chakra-ui/react'
import { useFormik } from 'formik'
import { CustomInput } from 'components/Forms'
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa'

import Logo from 'assets/images/logo.svg'

const Landing: React.FC<RouteComponentProps> = (): JSX.Element => {
  const d = new Date()

  const toast = useToast()

  const formik = useFormik({
    initialValues: {
      email: ''
    },
    // validationSchema
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        setSubmitting(true)
        // const res = await contactUs(values)
        toast({
          //   description: res.message,
          status: 'success',
          duration: 5000,
          position: 'top-right'
        })
        resetForm({})
      } catch (error) {
        toast({
          title: 'Error occured',
          description:
            error?.message ||
            error?.data?.message ||
            'Unexpected network error.',
          status: 'error',
          duration: 5000,
          position: 'top-right'
        })
      } finally {
        setSubmitting(false)
      }
    }
  })

  const links = [
    {
      title: 'Company 1',
      items: [
        {
          title: 'About Us',
          link: '/'
        },
        {
          title: 'Career',
          link: '/'
        },
        {
          title: 'Contact',
          link: '/'
        }
      ]
    },
    {
      title: 'Company 2',
      items: [
        {
          title: 'About Us 2',
          link: '/'
        },
        {
          title: 'Career 2',
          link: '/'
        },
        {
          title: 'Privacy Policy',
          link: '/'
        }
      ]
    },
    {
      title: 'Resources',
      items: [
        {
          title: 'Help Center',
          link: '/'
        },
        {
          title: 'My Account',
          link: '/'
        },
        {
          title: 'Catalogues',
          link: '/'
        }
      ]
    }
  ]

  const IconWrapper: React.FC<any> = ({ icon }): JSX.Element => (
    <Flex
      h={6}
      w={6}
      border="1px"
      rounded="full"
      borderColor="white"
      align="center"
      justify="center"
    >
      <Icon as={icon} boxSize={3} />
    </Flex>
  )

  return (
    <Box bgColor="ojaGreen" color="white">
      <Container
        maxW="6xl"
        paddingInline={0}
        pt={{ base: 8, xl: 24 }}
        pb={{ base: 4, xl: 14 }}
      >
        <Flex align="center" justify="space-between">
          <Box w={{ xl: '45%' }}>
            <Heading fontSize="28" fontWeight={600} letterSpacing="-0.6px">
              Get important updates
            </Heading>
            <Text
              mt={{ xl: 4 }}
              fontSize="md"
              lineHeight="25px"
              letterSpacing="0.36px"
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna
            </Text>
          </Box>
          <Box w={{ xl: '45%' }}>
            <form
              style={{ display: 'flex', alignItems: 'center' }}
              onSubmit={formik.handleSubmit}
            >
              <CustomInput
                id="email"
                name="email"
                rounded={0}
                color="#000"
                type="email"
                bgColor="white"
                lineHeight="150%"
                fontSize={{ xl: 'xl' }}
                onBlur={formik.handleBlur}
                error={formik.errors.email}
                h={{ base: 12, xl: 14 }}
                onChange={formik.handleChange}
                placeholder="example@gmail.com"
                touched={!!formik.touched.email}
                defaultValue={formik.values.email}
              />
              <Button
                px={10}
                roundedLeft="none"
                roundedRight="sm"
                color="white"
                h={{ xl: 14 }}
                fontWeight={600}
                bgColor="#03332A"
                letterSpacing="0.36px"
                _focus={{ outline: 'none' }}
                _hover={{ bgColor: '#03332A' }}
                fontSize={{ base: 'sm', xl: 'md' }}
              >
                Subscribe
              </Button>
            </form>
          </Box>
        </Flex>
        <Divider my={{ base: 4, xl: 14 }} />
        <Flex align="center" justify="space-between">
          <Box w={{ xl: '45%' }}>
            <Link
              to="/"
              _focus={{ outline: 'none' }}
              _hover={{ outline: 'none' }}
            >
              <Box
                bgImage={`url('${Logo}')`}
                bgSize="contain"
                bgRepeat="no-repeat"
                w={16}
                h={9}
              />
            </Link>
            <Text
              mt={{ xl: 8 }}
              fontSize="md"
              lineHeight="25px"
              letterSpacing="0.36px"
            >
              Ut enim ad minim vLorem ipsum dolor sit amet, consectetur
              adipiscing elit, sed do eiusmod tempor incididunt ut
            </Text>
            <Box w="80%" mt={{ xl: 14 }}>
              <Divider mb={{ xl: 4 }} />
              <Flex w="full" align="center" justify="space-between">
                <Text>{d.getFullYear()} © Oj’a - All rights reserved </Text>
                <Flex w={{ xl: '25%' }} align="center" justify="space-between">
                  <IconWrapper icon={FaFacebookF} />
                  <IconWrapper icon={FaTwitter} />
                  <IconWrapper icon={FaInstagram} />
                </Flex>
              </Flex>
            </Box>
          </Box>
          <Grid
            gap={4}
            w={{ xl: '45%' }}
            fontSize={{ xl: 'md' }}
            templateColumns={{ xl: 'repeat(3, 1fr)' }}
          >
            {links.map(l => (
              <GridItem key={l.title}>
                <Text>{l.title}</Text>
                {l.items.map(i => (
                  <Box mt={2} key={i.title}>
                    <Link
                      d="block"
                      href={i.link}
                      key={i.title}
                      fontWeight="bold"
                    >
                      {i.title}
                    </Link>
                  </Box>
                ))}
              </GridItem>
            ))}
          </Grid>
        </Flex>
      </Container>
    </Box>
  )
}

export default Landing
