import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet-async'
import { useFormik } from 'formik'
import { useQuery } from 'react-query'
import {
  Box,
  Flex,
  Link,
  Grid,
  Text,
  Icon,
  Heading,
  GridItem,
  useToast,
  Fade
} from '@chakra-ui/react'
import { NavLink, RouteComponentProps } from 'react-router-dom'
import {
  FiUser,
  FiMail,
  FiUserX,
  FiUserPlus,
  FiUserCheck,
  FiArrowRight
} from 'react-icons/fi'
import { FaFacebookSquare } from 'react-icons/fa'
import { IconType } from 'react-icons/lib'

import {
  CustomInputGroup,
  CustomPasswordInput,
  CustomPhoneInput
} from 'components/Forms'
import { RegisterUserPayloadDto, ResponsePayload, ICountry } from 'interface'
import { RegistrationSchema } from 'utils/validator-schemas'
import { Small, Splash } from 'components/Loading'
import { convertArrayToObject } from 'utils/helpers'
import { CustomButton } from 'components/Auth'
import { GoogleIcon } from 'components/SVG'
import useApi from 'context/Api'

const Register: React.FC<RouteComponentProps> = ({ history }): JSX.Element => {
  const [isUsernamePicked, setUsernamePicked] = useState<boolean>()
  const [isEmailPicked, setEmailPicked] = useState<boolean>()
  const [isPhoneNumberPicked, setPhoneNumberPicked] = useState<boolean>()
  const [selectedCountry, setSelectedCountry] = useState('NG')
  const [isLoading, setLoading] = useState<boolean>(false)
  const { register, getUsersCount, getCountries } = useApi()
  const toast = useToast()

  const initialValues = {
    email: '',
    lastName: '',
    username: '',
    password: '',
    firstName: '',
    phoneNumber: '',
    address: { country: '' }
  } as RegisterUserPayloadDto

  const formik = useFormik({
    initialValues,
    validationSchema: RegistrationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        setSubmitting(true)
        const res = await register(values)
        toast({
          title: res.message,
          description: `An OTP has been sent to ${res.data?.phoneNumber}`,
          status: 'success',
          duration: 5000,
          position: 'top-right'
        })
        resetForm({})
        history.push(
          `/auth/${btoa(
            JSON.stringify({
              phoneNumber: res.data?.phoneNumber || '',
              pinId: res.otpResponse?.pinId || ''
            })
          )}`
        )
      } catch (error) {
        toast({
          title: 'Error occurred',
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

  const {
    dirty,
    values,
    errors,
    touched,
    isValid,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
    setFieldValue,
    setFieldTouched
  } = formik

  const {
    data,
    isLoading: isLoadingCountries,
    error: CountryError
  } = useQuery<ResponsePayload<ICountry[], string>>('countries', () =>
    getCountries()
  )

  const handleCheck = async (name: string, val: string) => {
    try {
      if (!val) return
      setEmailPicked(false)
      setUsernamePicked(false)
      setPhoneNumberPicked(false)
      setLoading(true)
      const res = await getUsersCount({ [name]: val })
      if (res.count) {
        if (name === 'username') {
          setUsernamePicked(true)
        }
        if (name === 'email') {
          setEmailPicked(true)
        }
        if (name === 'phoneNumber') {
          setPhoneNumberPicked(true)
        }
      }
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const getIcon = (name: string, def: IconType) => {
    if (typeof isUsernamePicked === 'undefined') {
      return def
    }
    if (isUsernamePicked) {
      return name === 'username' ? FiUserX : def
    } else {
      return name === 'username' ? FiUserCheck : def
    }
  }

  return (
    <Box>
      <Helmet>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Create an account. For user to use our application they have to create and account"
        />
        <title>Oj'a. | Create Account</title>
        <link rel="canonical" href="/auth/login" />
      </Helmet>
      {isLoadingCountries && <Splash />}
      <Flex w="full" h="100vh" bgColor="white">
        <Box py={14} w={127} m="auto" rounded="sm" px={{ xl: 100 }}>
          {!isLoadingCountries && (
            <>
              {CountryError ? (
                <Text>Error: {CountryError}</Text>
              ) : (
                <Fade in={true}>
                  <Box mb={10}>
                    <Heading textAlign="center" fontWeight={600} fontSize="3xl">
                      Create Account
                    </Heading>
                    <Text textAlign="center" fontSize="md" color="gray.700">
                      Let's make your savings come true
                    </Text>
                  </Box>
                  <form onSubmit={handleSubmit}>
                    <Grid
                      templateColumns={{ lg: 'repeat(2, 1fr)' }}
                      columnGap={{ base: 3, lg: 4 }}
                      rowGap={{ base: 3, lg: 8 }}
                    >
                      {/* first name */}
                      <GridItem>
                        <CustomInputGroup
                          h={12}
                          border={0}
                          rounded={0}
                          isRequired
                          id="firstName"
                          type="firstName"
                          name="firstName"
                          label="First Name"
                          placeholder="John"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={errors.firstName}
                          _focus={{ outline: 'none' }}
                          touched={!!touched.firstName}
                          defaultValue={values.firstName}
                          leftAddon={<Icon as={FiUser} />}
                        />
                      </GridItem>
                      {/* last name */}
                      <GridItem>
                        <CustomInputGroup
                          h={12}
                          border={0}
                          rounded={0}
                          isRequired
                          id="lastName"
                          type="lastName"
                          name="lastName"
                          label="Last Name"
                          placeholder="Doe"
                          onBlur={handleBlur}
                          error={errors.lastName}
                          onChange={handleChange}
                          _focus={{ outline: 'none' }}
                          touched={!!touched.lastName}
                          defaultValue={values.lastName}
                          leftAddon={<Icon as={FiUser} />}
                        />
                      </GridItem>
                      {/* user name */}
                      <GridItem>
                        <CustomInputGroup
                          h={12}
                          border={0}
                          rounded={0}
                          isRequired
                          id="username"
                          type="username"
                          name="username"
                          onBlur={e => {
                            handleBlur(e)
                            handleCheck(e.target.name, e.target.value)
                          }}
                          onChange={e => {
                            setUsernamePicked(false)
                            handleChange(e)
                          }}
                          error={
                            isUsernamePicked
                              ? 'Username already picked'
                              : errors.username
                          }
                          label="Username"
                          touched={!!touched.username || !!isUsernamePicked}
                          _focus={{ outline: 'none' }}
                          defaultValue={values.username}
                          leftAddon={
                            <Icon
                              as={getIcon('username', FiUserPlus)}
                              color={isUsernamePicked ? 'red.500' : ''}
                            />
                          }
                          rightAddon={
                            isLoading ? <Small thickness="2px" /> : undefined
                          }
                          placeholder="JohnDoe1"
                        />
                      </GridItem>
                      {/* email */}
                      <GridItem>
                        <CustomInputGroup
                          h={12}
                          id="email"
                          isRequired
                          border={0}
                          rounded={0}
                          type="email"
                          name="email"
                          label="Email"
                          error={
                            isEmailPicked
                              ? 'Email already registered'
                              : errors.email
                          }
                          touched={!!touched.email || !!isEmailPicked}
                          defaultValue={values.email}
                          onBlur={e => {
                            handleBlur(e)
                            handleCheck(e.target.name, e.target.value)
                          }}
                          onChange={e => {
                            setUsernamePicked(false)
                            handleChange(e)
                          }}
                          _focus={{ outline: 'none' }}
                          placeholder="johndoe@gmail.com"
                          leftAddon={<Icon as={FiMail} />}
                        />
                      </GridItem>
                      {/* phone input */}
                      <GridItem colSpan={2}>
                        <CustomPhoneInput
                          h={12}
                          pl={0}
                          border={0}
                          rounded={0}
                          isRequired
                          type="text"
                          id="phoneNumber"
                          name="phoneNumber"
                          label="Phone Number"
                          countryId="address.country"
                          handleCheck={handleCheck}
                          _focus={{ outline: 'none' }}
                          setFieldValue={setFieldValue}
                          setFieldTouched={setFieldTouched}
                          touched={
                            !!touched.phoneNumber || !!isPhoneNumberPicked
                          }
                          error={
                            isPhoneNumberPicked
                              ? 'Phone number already registered'
                              : errors.phoneNumber
                          }
                          selectedCountry={selectedCountry}
                          defaultValue={values.phoneNumber}
                          setSelectedCountry={setSelectedCountry}
                          countriesData={convertArrayToObject(
                            data?.data,
                            'code'
                          )}
                        />
                      </GridItem>
                      {/* password */}
                      <GridItem>
                        <CustomPasswordInput
                          h={12}
                          border={0}
                          rounded={0}
                          id="password"
                          name="password"
                          label="Password"
                          onBlur={handleBlur}
                          error={errors.password}
                          onChange={handleChange}
                          placeholder="Your password"
                          _focus={{ outline: 'none' }}
                          touched={!!touched.password}
                          defaultValue={values.password}
                        />
                      </GridItem>
                      {/* confirm password */}
                      <GridItem>
                        <CustomPasswordInput
                          h={12}
                          border={0}
                          rounded={0}
                          onBlur={handleBlur}
                          id="confirmPassword"
                          name="confirmPassword"
                          label="Confirm Password"
                          onChange={handleChange}
                          _focus={{ outline: 'none' }}
                          error={errors.confirmPassword}
                          placeholder="Confirm Password"
                          touched={!!touched.confirmPassword}
                          defaultValue={values.confirmPassword}
                        />
                      </GridItem>
                      {/* form btn */}
                      <GridItem colSpan={2}>
                        <CustomButton
                          px={8}
                          w="full"
                          d="flex"
                          type="submit"
                          color="white"
                          bgColor="ojaDark"
                          isLoading={isSubmitting}
                          title="Create your account"
                          _hover={{ bgColor: 'ojaDark' }}
                          fontSize={{ base: 'sm', xl: 'md' }}
                          rightIcon={
                            <FiArrowRight
                              fontSize={20}
                              className="auth-btn-arrow"
                            />
                          }
                          isDisabled={
                            isSubmitting ||
                            !(dirty && isValid) ||
                            isUsernamePicked
                          }
                        />
                      </GridItem>
                    </Grid>
                    <Flex my={{ xl: 8 }} w="full" justify="center">
                      <Text>
                        Already have an account{' '}
                        <Link as={NavLink} fontWeight="bold" to="/auth/login">
                          Login
                        </Link>
                      </Text>
                    </Flex>
                    <Flex justify="space-between" align="center">
                      <CustomButton
                        mr={1}
                        shadow="lg"
                        fontSize="sm"
                        bgColor="white"
                        color="gray.700"
                        _hover={{ bgColor: 'none' }}
                        title="Sign up with Facebook"
                        leftIcon={
                          <FaFacebookSquare color="#385997" fontSize={30} />
                        }
                      />
                      <CustomButton
                        ml={1}
                        shadow="lg"
                        fontSize="sm"
                        color="gray.700"
                        bgColor="white"
                        _hover={{ bgColor: 'none' }}
                        leftIcon={<Icon as={GoogleIcon} />}
                        title="Sign up with Google"
                      />
                    </Flex>
                  </form>
                </Fade>
              )}
            </>
          )}
        </Box>
      </Flex>
    </Box>
  )
}

Register.propTypes = {
  history: PropTypes.any.isRequired
}

export default Register
