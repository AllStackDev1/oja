import React from 'react'
import { useFormik } from 'formik'
import { useQueryClient } from 'react-query'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'
import { Grid, GridItem } from '@chakra-ui/react'

import { ActiveDealsCard } from 'components/Dashboard/Deal'
import { DealValidationSchema } from 'utils/validator-schemas'
import Wrapper from 'containers/Layout/Wrapper'
import { CustomButton } from 'components/Auth'
import {
  DebitFrom,
  CreditTo,
  TransactionSummary
} from 'components/Dashboard/Deal/Create'
import { ICurrency, IDeal } from 'interface'
import useApi from 'context/Api'
import { useHistory } from 'react-router-dom'

const accountDetails = {
  amount: 0,
  bankName: '',
  swiftCode: '',
  accountName: '',
  accountNumber: ''
}

const CreateDeal = (): JSX.Element => {
  const [isTermsAccepted, setTermsAccept] = React.useState(false)
  const [viewSummary, setViewSummary] = React.useState(false)
  const [_data, setData] = React.useState({
    rate: 0,
    transactionFee: 0,
    settlementFee: 0,
    debit: accountDetails,
    credit: accountDetails
  })
  const [_out, setOut] = React.useState<ICurrency>()
  const [_in, setIn] = React.useState<ICurrency>()

  const queryClient = useQueryClient()
  const { createDeal } = useApi()
  const { push } = useHistory()

  React.useEffect(() => {
    if (!sessionStorage.getItem('new-deal')) {
      push('/dashboard/deals')
    } else {
      const d = JSON.parse(sessionStorage.getItem('new-deal') || '{}')
      setOut(d.outCurrency)
      setIn(d.inCurrency)
      const type = d.inCurrency?.code + '_' + d.outCurrency?.code
      delete d.outCurrency
      delete d.inCurrency
      setData(p => ({
        ...p,
        ...d,
        type
      }))
      sessionStorage.removeItem('new-deal')
    }
    window.addEventListener('beforeunload', beforeUnloadListener)
    return () =>
      window.removeEventListener('beforeunload', beforeUnloadListener)
  }, [])

  const beforeUnloadListener = (event: Event) => {
    event.preventDefault()
    return (event.returnValue = true)
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: _data,
    validationSchema: DealValidationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true)
      const res = await createDeal(values as IDeal)
      if (res.success) {
        resetForm({})
        push('/dashboard/deals')
        queryClient.invalidateQueries()
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
      placeholder: 'ACCCGHACCBS',
      isRequired: false
    }
  ]

  return (
    <Wrapper
      title="Oj'a. | Create Deal"
      href="/dashboard/create-deal"
      content="This page"
    >
      <Grid
        mt={14}
        mr={10}
        ml={{ base: 28, '4xl': 32 }}
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(3, 1fr)"
        columnGap={{ base: 24, '4xl': 44 }}
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
                    outFlag={_out?.flag}
                    outName={_out?.name}
                  />
                  <DebitFrom
                    formData={formData}
                    values={values.debit}
                    errors={errors.debit}
                    touched={touched.debit}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    inFlag={_in?.flag}
                    inName={_in?.name}
                  />
                </>
              ) : (
                <TransactionSummary
                  inSymbol={_in?.symbol}
                  outSymbol={_out?.symbol}
                  values={values as IDeal}
                  setTermsAccept={setTermsAccept}
                  isTermsAccepted={isTermsAccepted}
                  title={_in?.name + 'To' + _out?.name}
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
