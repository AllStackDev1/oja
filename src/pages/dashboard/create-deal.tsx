import React from 'react'
import { useFormik } from 'formik'

import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'
import { Heading, Grid, GridItem } from '@chakra-ui/react'
import { Prompt, useHistory } from 'react-router-dom'

import Wrapper from 'containers/Layout/Wrapper'
import { AccountDetailForm, TransactionSummary } from 'components/Deal/Create'
import { ActiveDealsCard } from 'components/Deal'
import { CustomButton } from 'components/Auth'

import { DealValidationSchema } from 'utils/validator-schemas'

import { ICurrency, IDeal, IAccountDetails } from 'interfaces'

import useApi from 'context/Api'

const accountDetails: IAccountDetails = {
  bank: {
    name: '',
    code: '',
    swiftCode: '',
    routingNumber: ''
  },
  amount: 0,
  accountName: '',
  accountNumber: ''
}

const CreateDeal = (): JSX.Element => {
  const [isTermsAccepted, setTermsAccept] = React.useState(false)
  const [viewSummary, setViewSummary] = React.useState(false)
  const [isBlocking, setBlocking] = React.useState(false)
  const [_data, setData] = React.useState({
    rate: 0,
    transactionFee: 0,
    settlementFee: 0,
    debit: accountDetails,
    credit: accountDetails
  })
  const [_out, setOut] = React.useState<ICurrency>()
  const [_in, setIn] = React.useState<ICurrency>()

  const { createDeal } = useApi()
  const { push } = useHistory()

  React.useEffect(() => {
    if (!sessionStorage.getItem('new-deal')) {
      push('/dashboard/deals')
    } else {
      setBlocking(true)
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
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true)
      const res = await createDeal(values as IDeal)
      if (res.success) {
        setBlocking(false)
        push('/dashboard/deals')
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
    isSubmitting,
    setFieldValue
  } = formik

  const title = _in?.name + ' to ' + _out?.name

  return (
    <Wrapper
      title="Oj'a. | Create Deal"
      href="/dashboard/create-deal"
      content="This page"
    >
      <Prompt when={isBlocking} message="You’ll lose unsaved data!" />
      <Grid
        mt={14}
        mr={10}
        ml={{ base: 28, '4xl': 32 }}
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(3, 1fr)"
        columnGap={{ base: 24, '4xl': 44 }}
      >
        <GridItem colSpan={2} rowSpan={2}>
          <Heading mb={3} fontWeight={500} fontSize="2xl">
            {title}
          </Heading>
          <form onSubmit={handleSubmit}>
            <Grid rowGap={8}>
              {!viewSummary ? (
                <>
                  <AccountDetailForm
                    id="credit"
                    flag={_out?.flag}
                    name={_out?.name}
                    values={values.credit}
                    errors={errors.credit}
                    handleBlur={handleBlur}
                    touched={touched.credit}
                    handleChange={handleChange}
                    setFieldValue={setFieldValue}
                  />

                  <AccountDetailForm
                    id="debit"
                    flag={_in?.flag}
                    name={_in?.name}
                    values={values.debit}
                    errors={errors.debit}
                    handleBlur={handleBlur}
                    touched={touched.debit}
                    handleChange={handleChange}
                    setFieldValue={setFieldValue}
                  />
                </>
              ) : (
                <TransactionSummary
                  title={title}
                  inCode={_in?.code}
                  outCode={_out?.code}
                  values={values as IDeal}
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
