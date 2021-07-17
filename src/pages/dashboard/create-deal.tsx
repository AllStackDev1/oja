import React from 'react'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'
import { Grid, GridItem } from '@chakra-ui/react'
import { useFormik } from 'formik'

import { ActiveDealsCard } from 'components/Dashboard/Deal'
import { DealValidationSchema } from 'utils/validator-schemas'
import Wrapper from 'containers/Layout/Wrapper'
import { CustomButton } from 'components/Auth'
import {
  DebitFrom,
  CreditTo,
  TransactionSummary
} from 'components/Dashboard/Deal/Create'
import { IDeal } from 'interface'
import useApi from 'context/Api'

const CreateDeal = (): JSX.Element => {
  const [viewSummary, setViewSummary] = React.useState(false)
  const [isTermsAccepted, setTermsAccept] = React.useState(false)
  const { createDeal } = useApi()

  const initialValues = JSON.parse(
    sessionStorage.getItem('new-deal') || ''
  ) as IDeal

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: DealValidationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true)
      const res = await createDeal(values)
      if (res.success) {
        sessionStorage.removeItem('new-deal')
        resetForm({})
      }
      setSubmitting(false)
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

  const formData = [
    {
      name: 'accountNumber',
      placeholder: '23843001203',
      label: 'Enter account number',
      isRequired: true
    },
    {
      name: 'bankName',
      label: 'Bank',
      placeholder: 'ABC Bank',
      isRequired: true
    },
    {
      name: 'accountName',
      label: 'Account Name',
      placeholder: 'John Doe',
      isRequired: true
    },
    {
      name: 'swiftCode',
      label: 'Swift code',
      placeholder: 'J73UIE',
      isRequired: false
    }
  ]

  return (
    <Wrapper
      title="Oj'a. | Dashboard | Vending"
      href="/dashboard/vending"
      content="This is the application dashboard vent to page"
    >
      <Grid
        mt={14}
        ml={{ base: 28, '4xl': 32 }}
        mr={10}
        columnGap={{ base: 24, '4xl': 44 }}
        templateColumns="repeat(3, 1fr)"
        templateRows="repeat(2, 1fr)"
      >
        <GridItem colSpan={2} rowSpan={2}>
          <form onSubmit={handleSubmit}>
            <Grid rowGap={8}>
              {!viewSummary ? (
                <>
                  <CreditTo
                    formData={formData}
                    values={values.credit}
                    errors={errors.credit}
                    touched={touched.credit}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                  />
                  <DebitFrom
                    formData={formData}
                    values={values.debit}
                    errors={errors.debit}
                    touched={touched.debit}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                  />
                </>
              ) : (
                <TransactionSummary
                  values={values}
                  setTermsAccept={setTermsAccept}
                  isTermsAccepted={isTermsAccepted}
                />
              )}

              <GridItem d="flex" justifyContent="space-between">
                {viewSummary && (
                  <CustomButton
                    px={8}
                    w="40%"
                    d="flex"
                    color="white"
                    bgColor="ojaDark"
                    _hover={{ bgColor: 'ojaDark' }}
                    title="Back"
                    fontSize={{ base: 'sm', xl: 'md' }}
                    leftIcon={
                      <FiArrowLeft
                        fontSize={20}
                        className="auth-left-btn-arrow"
                      />
                    }
                    onClick={() => setViewSummary(false)}
                  />
                )}
                <CustomButton
                  px={8}
                  d="flex"
                  color="white"
                  bgColor="ojaDark"
                  isLoading={isSubmitting}
                  _hover={{ bgColor: 'ojaDark' }}
                  w={!viewSummary ? '70%' : '40%'}
                  fontSize={{ base: 'sm', xl: 'md' }}
                  onClick={() => {
                    if (viewSummary) {
                      handleSubmit()
                    } else {
                      setViewSummary(true)
                    }
                  }}
                  title={!viewSummary ? 'Continue' : 'Complete Deal'}
                  rightIcon={
                    <FiArrowRight fontSize={20} className="auth-btn-arrow" />
                  }
                  isDisabled={
                    isSubmitting ||
                    !(dirty && isValid) ||
                    (viewSummary && !isTermsAccepted)
                  }
                />
              </GridItem>
            </Grid>
          </form>
        </GridItem>
        <ActiveDealsCard w={110} />
      </Grid>
    </Wrapper>
  )
}

export default CreateDeal
