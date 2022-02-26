import React, { FC, useState, useEffect } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import {
  Box,
  Flex,
  Text,
  VStack,
  Switch,
  Heading,
  FormLabel,
  FormControl
} from '@chakra-ui/react'

import { FiArrowRight } from 'react-icons/fi'

import { CustomButton } from 'components/Auth'
import { CopyIcon } from 'components/SVG'
import { formatMoney } from 'utils/helpers'
import { IActiveDealsLatestTransaction } from 'interfaces'
import useApi from 'context/Api'
import VerifyFundOverlay from './OverlayModal'
import SuccessModal from './SuccessModal'
import useCounter from 'hooks/useCounter'

const InteracFundWalletCard: FC<{ deal?: IActiveDealsLatestTransaction }> = ({
  deal
}): JSX.Element => {
  const [isEmailCopied, setEmailCopied] = useState(false)
  const [isTermsAccepted, setTermsAccept] = useState(false)
  const [success, setSuccess] = useState<null | string>()
  const [error, setError] = useState<null | string>()
  const [isSubmitting, setSubmitting] = useState(false)
  const { confirmInteracFunding } = useApi()

  const formatDisplayValue = () => {
    if (deal?.debit?.amount) {
      return formatMoney(deal?.debit.amount, deal?.type?.split('_')[0]).split(
        'CA$'
      )[1]
    }
    return 0
  }

  const handleConfirm = async () => {
    try {
      setSubmitting(true)
      const res = await confirmInteracFunding(deal?._id as string)
      setSuccess(res.message || '')
    } catch (err: any) {
      setError(err?.message || err?.data?.message || 'Unexpected server error')
    } finally {
      setSubmitting(false)
    }
  }

  const counter = useCounter(!!error, 60)

  useEffect(() => {
    if (!counter) {
      setError(null)
    }
  }, [counter])

  return (
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
          <Text
            mt={10}
            fontSize="lg"
            lineHeight="21.6px"
            color="gray.600"
            textAlign="center"
          >
            Send the amount below to the interact wallet below
          </Text>
        </Box>
        <Box w="75%">
          <Flex align="baseline" justify="center">
            <Text fontSize="40px" mr={4} color="#808080">
              CA$
            </Text>
            <Text fontSize="5xl">{formatDisplayValue()}</Text>
          </Flex>
        </Box>
        <Box w="75%" textAlign="center">
          <CopyToClipboard
            text="ojawallet@gmail.com"
            onCopy={() => setEmailCopied(true)}
          >
            <Box
              mb={4}
              w="full"
              role="button"
              rounded="sm"
              _hover={{ shadow: 'md' }}
              bg="rgba(35, 179, 232, 0.05)"
            >
              <Flex
                py={5}
                pl={14}
                pr={6}
                justify="space-between"
                align="center"
              >
                <Text
                  sm="sm"
                  color="#23B3E8"
                  fontWeight={600}
                  letterSpacing="0.04em"
                >
                  ojawallet@gmail.com
                </Text>

                <CopyIcon />
              </Flex>
            </Box>
          </CopyToClipboard>

          {isEmailCopied && (
            <Text fontWeight="bold" fontSize="sm" color="#219653">
              Email Copied
            </Text>
          )}
        </Box>
        <Box w="50%">
          <FormControl display="flex" alignItems="baseline">
            <Switch
              size="sm"
              id="accept-tc"
              colorScheme="ojaColorSchemaDark"
              onChange={() => setTermsAccept(!isTermsAccepted)}
            />
            <FormLabel
              ml={5}
              mr={0}
              fontSize="md"
              color="ojaDark"
              cursor="pointer"
              fontWeight="bold"
              htmlFor="accept-tc"
            >
              I have sent the funds
            </FormLabel>
          </FormControl>
          <Box mt={3}>
            <CustomButton
              px={6}
              w="full"
              d="flex"
              color="white"
              type="submit"
              title="Confirm"
              bgColor="ojaDark"
              onClick={handleConfirm}
              isLoading={isSubmitting}
              _hover={{ bgColor: 'ojaDark' }}
              fontSize={{ base: 'sm', xl: 'md' }}
              isDisabled={error ? !!counter : !isTermsAccepted}
              rightIcon={
                <FiArrowRight fontSize={20} className="auth-btn-arrow" />
              }
            />
          </Box>
        </Box>
        {error && (
          <Box color="red.500">
            <Text fontSize="sm">{error}</Text>
            <Text fontWeight="bold" textAlign="center" fontSize="sm">
              {counter}s
            </Text>
          </Box>
        )}
      </VStack>
      {success && (
        <SuccessModal code="CAD" amount={'CA$' + formatDisplayValue()} />
      )}
      {isSubmitting && <VerifyFundOverlay />}
    </>
  )
}

export default InteracFundWalletCard
