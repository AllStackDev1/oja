import React from 'react'
import { Helmet } from 'react-helmet'
import { useFormik } from 'formik'
import { Flex, Box, Text, Heading, useToast } from '@chakra-ui/react'
import { CustomOTPInput } from 'components/Forms'
import { FiArrowRight } from 'react-icons/fi'
import { CustomButton } from 'components/Auth'

const OTP = (): JSX.Element => {
  const toast = useToast()

  const formik = useFormik({
    initialValues: {
      otp: '',
      phoneNumber: ''
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

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content="This is the application login page" />
        <title>OTP Verofication</title>
        <link rel="canonical" href="/auth/login" />
      </Helmet>
      <Flex w="full" h="100vh" bgColor="white">
        <Box py={14} w="heroHeight" m="auto" rounded="sm" px={{ xl: 100 }}>
          <Box mb={10}>
            <Heading textAlign="center" fontWeight={600} fontSize="3xl">
              OTP Verification
            </Heading>
            <Text textAlign="center" fontSize="md" color="gray.700">
              A SMS with your One time password have been sent to +234 811 611
              0956, input the code below and continue.
            </Text>
          </Box>
          <form onSubmit={formik.handleSubmit}>
            <Box mb={8}>
              <CustomOTPInput
                value={formik.values.otp}
                error={formik.errors.otp}
                isDisabled={formik.isSubmitting}
                onChange={(c: string) => formik.setFieldValue('code', c)}
              />
            </Box>

            <Box mx="auto" w="90%" mt={{ xl: 14 }}>
              <CustomButton
                px={8}
                w="full"
                d="flex"
                color="white"
                bgColor="ojaDark"
                _hover={{ bgColor: 'ojaDark' }}
                title="Create your account"
                fontSize={{ base: 'sm', xl: 'md' }}
                rightIcon={<FiArrowRight fontSize={20} />}
              />
            </Box>
          </form>
        </Box>
      </Flex>
    </>
  )
}

export default OTP
