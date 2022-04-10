import React, { FC, useEffect, useState } from 'react'
import { Box, Flex, Text, VStack, Heading } from '@chakra-ui/react'
import useScript from 'react-script-hook'
import { FiArrowRight } from 'react-icons/fi'

import { CustomButton } from 'components/Auth'

import useAuth from 'context/Auth'
import useApi from 'context/Api'
import ReloadCard from 'components/ReloadCard'
import { IActiveDealsLatestTransaction } from 'interfaces'
import { buildSignature, formatMoney } from 'utils/helpers'
import SuccessModal from 'components/Interact/SuccessModal'

const SendCashPay: FC<{ deal: IActiveDealsLatestTransaction }> = ({ deal }) => {
  const [isLoading, setLoading] = useState<boolean>(false)
  const [success, setSuccess] = useState<null | string>()

  const { isAuthenticated } = useAuth()
  const { processSendCash } = useApi()

  const user = isAuthenticated().user

  const formatDisplayValue = () => {
    return formatMoney(deal.debit.amount, deal.type.split('_')[0])
  }

  const [loading, error] = useScript({
    src: 'https://checkout.sendcashpay.com/lib/lib.bundle.js'
  })

  useEffect(() => {
    if (!loading && !error) {
      window.SendcashPay.init({
        siteName: 'Oja',
        siteUrl: 'https://oja.surge.sh',
        siteLogo: 'https://avatars.githubusercontent.com/u/58121563?v=4',
        publicKey: 'pk_live_YoudeJjsFbXdCogcwvqpqGCmWfYwKUkq'
      })
    }
  }, [loading, error])

  const handleSendCashPayCall = async () => {
    try {
      const data = {
        userId: user?._id || '',
        amount: deal.debit.amount,
        destinationBankCode: '063',
        destinationAccountNumber: '0026492516',
        transactionReference: btoa(user?._id + '_' + new Date().getTime())
      }

      const signature = buildSignature(
        data.userId,
        data.transactionReference,
        +parseFloat(
          '' + Math.round(data.amount * 100 + Number.EPSILON)
        ).toFixed(2),
        data.destinationAccountNumber,
        data.destinationBankCode
      )

      setLoading(true)
      const result = await window.SendcashPay.charge({
        ...data,
        signature
      })
      if (result.paymentId) {
        const res = await processSendCash(deal._id)
        setSuccess(res.message || '')
      }
    } catch (err: any) {
      alert(err?.message || err?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return loading || error ? (
    <ReloadCard
      h="50vh"
      error={`Failed to load sendcashpay API: ${error?.message}`}
      refetch={() => window.location.reload()}
      text="Loading SendCashPay API"
      isLoading={loading}
      justify="center"
    />
  ) : (
    <>
      <VStack
        p={16}
        w={120}
        spacing={8}
        rounded="sm"
        align="center"
        flexDir="column"
        boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
      >
        <Box w="70%" textAlign="center">
          <Heading fontSize="4xl" fontWeight={600}>
            Fund Wallet
          </Heading>
        </Box>
        <Box w="75%">
          <Flex align="baseline" justify="center">
            <Text fontSize="40px" mr={4} color="#808080">
              ₦
            </Text>
            <Text fontSize="5xl">{formatDisplayValue().split('₦')[1]}</Text>
          </Flex>
        </Box>
        <Box mt={3} w="50%">
          <CustomButton
            px={6}
            w="full"
            d="flex"
            color="white"
            type="submit"
            title="Proceed"
            bgColor="ojaDark"
            onClick={() => handleSendCashPayCall()}
            _hover={{ bgColor: 'ojaDark' }}
            fontSize={{ base: 'sm', xl: 'md' }}
            rightIcon={
              <FiArrowRight fontSize={20} className="auth-btn-arrow" />
            }
            isLoading={isLoading}
          />
        </Box>
      </VStack>
      {success && <SuccessModal code="NGN" amount={formatDisplayValue()} />}
    </>
  )
}

export default SendCashPay
// !()
