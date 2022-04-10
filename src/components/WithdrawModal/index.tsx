import React from 'react'
import { useFormik } from 'formik'
import {
  Box,
  Modal,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalCloseButton
} from '@chakra-ui/react'
import { AccountDetailForm } from 'components/Deal/Create'

interface Props {
  isOpen: boolean
  onClose(): void
}

const WithdrawModal: React.FC<Props> = ({ isOpen, onClose }): JSX.Element => {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      bank: {
        name: '',
        code: '',
        swiftCode: '',
        routingNumber: ''
      },
      amount: 0,
      accountName: '',
      accountNumber: ''
    },
    // validationSchema: ,
    onSubmit: async (values, { setSubmitting }) => null
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

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl" isCentered>
      <ModalOverlay />
      <ModalContent
        rounded="xl"
        bg="white"
        mx={{ base: 5 }}
        mt={{ base: 44, lg: 'unset' }}
      >
        <ModalCloseButton p={2} size="lg" />
        <ModalBody>
          <Box py={12} px={{ base: 8, lg: 14 }}>
            <AccountDetailForm
              id="credit"
              name={'Naira'}
              values={values}
              errors={errors}
              touched={touched}
              handleBlur={handleBlur}
              handleChange={handleChange}
              setFieldValue={setFieldValue}
            />
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default WithdrawModal
