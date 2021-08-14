import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet-async'
import { useFormik } from 'formik'
import {
  Flex,
  Box,
  Link,
  Grid,
  Text,
  Icon,
  Checkbox,
  Heading,
  GridItem
} from '@chakra-ui/react'
import { NavLink, RouteComponentProps } from 'react-router-dom'
import { FiUser, FiArrowRight } from 'react-icons/fi'

import { CustomInputGroup, CustomPasswordInput } from 'components/Forms'
import { CustomButton } from 'components/Auth'
import { LoginSchema } from 'utils/validator-schemas'
import { LoginDto } from 'interface'

import useAuth from 'context/Auth'
import useApi from 'context/Api'
import SocialButtons from 'components/Auth/SocialButtons'

const Login: React.FC<RouteComponentProps> = ({ history }): JSX.Element => {
  const { store, setSession, rememberMe, setRememberMe } = useAuth()
  const { login } = useApi()

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: LoginSchema,
    onSubmit: async (values: LoginDto, { setSubmitting, resetForm }) => {
      setSubmitting(true)
      const res = await login(values)
      setSubmitting(false)
      if (res.success) {
        resetForm({})
        if (res.data?.user) {
          setSession(true)
          store({ user: res.data?.user, authToken: res?.data?.authToken })
          setTimeout(() => {
            history.push('/dashboard/deals')
          }, 250)
        } else {
          history.push(
            `/auth/${btoa(
              JSON.stringify({
                phoneNumber: res.data?.to || '',
                pinId: res.data?.pinId || ''
              })
            )}`
          )
        }
      }
    }
  })

  const {
    dirty,
    values,
    errors,
    touched,
    isValid,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting
  } = formik

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content="This is the application login page" />
        <title>Oj'a. | Login</title>
        <link rel="canonical" href="/auth/login" />
      </Helmet>
      <Flex w="full" h="100vh" bgColor="white">
        <Box py={14} w={126} m="auto" rounded="sm" px={{ xl: 100 }}>
          <Box mb={10}>
            <Heading textAlign="center" fontWeight={600} fontSize="3xl">
              Welcome, Login
            </Heading>
            <Text textAlign="center" fontSize="md" color="gray.700">
              Lets make your savings come true
            </Text>
          </Box>
          <form onSubmit={handleSubmit}>
            <Grid rowGap={2}>
              <GridItem>
                <CustomInputGroup
                  h={12}
                  id="email"
                  border={0}
                  rounded={0}
                  isRequired
                  type="email"
                  name="email"
                  label="Email address"
                  _focus={{ outline: 'none' }}
                  onBlur={handleBlur}
                  error={errors.email}
                  leftAddon={<Icon as={FiUser} />}
                  onChange={handleChange}
                  placeholder="example@gmail.com"
                  touched={!!touched.email}
                  defaultValue={values.email}
                />
              </GridItem>
              <GridItem>
                <CustomPasswordInput
                  h={12}
                  border={0}
                  rounded={0}
                  id="password"
                  name="password"
                  label="Password"
                  onBlur={handleBlur}
                  placeholder="Your password"
                  _focus={{ outline: 'none' }}
                  error={errors.password}
                  onChange={handleChange}
                  touched={!!touched.password}
                  defaultValue={values.password}
                />
              </GridItem>
              <GridItem mt={3}>
                <CustomButton
                  px={8}
                  w="full"
                  d="flex"
                  type="submit"
                  color="white"
                  bgColor="ojaDark"
                  isLoading={isSubmitting}
                  _hover={{ bgColor: 'ojaDark' }}
                  title="Login into your account"
                  fontSize={{ base: 'sm', xl: 'md' }}
                  rightIcon={
                    <FiArrowRight fontSize={20} className="auth-btn-arrow" />
                  }
                  isDisabled={isSubmitting || !(dirty && isValid)}
                />
              </GridItem>
              <GridItem
                d="flex"
                fontSize="xs"
                alignItems="center"
                justifyContent="space-between"
              >
                <Checkbox
                  size="md"
                  isChecked={rememberMe}
                  onChange={e => {
                    setRememberMe(e.target.checked)
                    sessionStorage.setItem(
                      'remember-me',
                      String(e.target.checked)
                    )
                  }}
                >
                  <Text fontSize="xs">Remember Me (60days)</Text>
                </Checkbox>
                <Link
                  as={NavLink}
                  fontWeight="bold"
                  to="/auth/request-password"
                >
                  Forgot Password?
                </Link>
              </GridItem>
              <GridItem
                d="flex"
                my={{ xl: 3 }}
                alignItems="center"
                justifyContent="center"
              >
                <Text>
                  Don’t have an account?{' '}
                  <Link as={NavLink} fontWeight="bold" to="/auth/register">
                    Register
                  </Link>
                </Text>
              </GridItem>
            </Grid>
            <SocialButtons type="in" />
          </form>
        </Box>
      </Flex>
    </>
  )
}

Login.propTypes = {
  history: PropTypes.any.isRequired
}

export default Login
