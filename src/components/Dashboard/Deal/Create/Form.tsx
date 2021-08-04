import React, { FC, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useQuery } from 'react-query'

import {
  Box,
  Icon,
  Flex,
  Text,
  Divider,
  Collapse,
  useDisclosure
} from '@chakra-ui/react'
import {
  FiMinus,
  FiPlusCircle,
  FiChevronDown,
  FiChevronRight,
  FiArrowRight
} from 'react-icons/fi'

import { EqualIcon } from 'components/SVG'
import { formatMoney } from 'utils/helpers'

import useAuth from 'context/Auth'
import useApi from 'context/Api'

import { CustomButton } from 'components/Auth'
import { BiRefresh } from 'react-icons/bi'
import InputFlag from './InputFlag'
import ReloadCard from 'components/ReloadCard'

const CreateForm: FC = (): JSX.Element => {
  const [displayValue, setDisplayValue] = useState<string | number>('')
  const [_in, setIn] = useState({ amount: 1000, code: 'USD' })
  const [_out, setOut] = useState({ amount: 0, code: 'NGN' })
  const [loading, setLoading] = useState(false)
  const { isOpen, onToggle } = useDisclosure()
  const { isAuthenticated } = useAuth()
  const [_rate, setRate] = useState(1)
  const { getCurrencies } = useApi()
  const history = useHistory()

  const { data, error, refetch, isLoading } = useQuery('currencies', () =>
    getCurrencies({ q: JSON.stringify({ status: true }) })
  )

  const getCurrency = (code: string) => data?.data?.find(o => o.code === code)

  const _inCurrency = getCurrency(_in.code)
  const _outCurrency = getCurrency(_out.code)

  const getOutOptions = () => _inCurrency?.rates?.map(rate => rate.currency)

  useEffect(() => {
    const rates = _inCurrency?.rates
    if (rates) {
      const rate = rates?.find(r => r.currency.code === _out.code)
      if (rate) {
        setRate(+rate.value.$numberDecimal)
        setOut(p => ({
          ...p,
          amount: _in.amount * +rate.value.$numberDecimal
        }))
      } else {
        setRate(1)
        setOut(p => ({ ...p, amount: _in.amount }))
      }
      formatDisplayValue(_in.amount)
    }
  }, [data, _in.code, _out.code])

  const parseNumber = (val: number) => {
    return +parseFloat('' + Math.round(val * 100 + Number.EPSILON)).toFixed(2)
  }

  const proceed = () => {
    setLoading(true)
    const data = JSON.stringify({
      rate: _rate,
      inCurrency: _inCurrency,
      outCurrency: _outCurrency,
      debit: {
        bankName: '',
        swiftCode: '',
        accountName: '',
        accountNumber: '',
        amount: parseNumber(_in.amount)
      },
      credit: {
        bankName: '',
        swiftCode: '',
        accountName: '',
        accountNumber: '',
        amount: parseNumber(_out.amount)
      },
      transactionFee: parseNumber(0.025 * _in.amount),
      settlementFee: parseNumber(0.005 * _in.amount)
    })
    sessionStorage.setItem('new-deal', data)
    let link = '/dashboard/create-deal'
    if (!isAuthenticated().authToken) {
      link = '/auth/login'
    }
    setTimeout(() => {
      setLoading(false)
      history.push(link)
    }, 200)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reg = /^-?\d+\.?\d*$/
    if (reg.test(e.target.value)) {
      setDisplayValue(e.target.value)
      setIn(p => ({ ...p, amount: +e.target.value || 1 }))
      setOut(p => ({
        ...p,
        amount: _rate * +e.target.value || 1
      }))
    }
  }

  const localStringToNumber = (s: string | number): number => {
    return Number(String(s).replace(/[^0-9.-]+/g, ''))
  }

  const formatDisplayValue = (val: string | number): void => {
    const value =
      val || val === '0' ? formatMoney(localStringToNumber(val), _in.code) : ''
    setDisplayValue(value)
  }

  return isLoading || error ? (
    <ReloadCard
      w="lg"
      h="40vh"
      bg="white"
      error={error}
      justify="center"
      refetch={refetch}
      text="fetching currencies"
      isLoading={isLoading}
    />
  ) : (
    <Box w="lg" id="create-deal-form">
      <Box mt={4}>
        <InputFlag
          input={{
            id: 'in',
            name: 'in',
            onFocus: (e: React.FocusEvent<HTMLInputElement>) => {
              const value = e.target.value
                ? localStringToNumber(e.target.value)
                : ''
              setDisplayValue(value)
            },
            onBlur: (e: React.FocusEvent<HTMLInputElement>) => {
              formatDisplayValue(e.target.value)
            },
            value: displayValue,
            onChange: handleChange,
            placeholder: 'Enter an amount...'
          }}
          select={{
            selected: _inCurrency,
            options: data?.data,
            onSelect: (code: string) => setIn(p => ({ ...p, code }))
          }}
        />
        <Divider
          h={10}
          opacity={1}
          borderLeftWidth={3}
          orientation="vertical"
          borderLeftColor="ojaSkyBlue"
        />
        <InputFlag
          input={{
            id: 'out',
            name: 'out',
            placeholder: '',
            isReadOnly: true,
            onChange: () => null,
            value: formatMoney(_out.amount, _outCurrency?.code)
          }}
          select={{
            selected: _outCurrency,
            options: getOutOptions(),
            onSelect: (code: string) => setOut(p => ({ ...p, code }))
          }}
        />
      </Box>
      <Box pl={{ xl: 6 }} pr={{ xl: 10 }}>
        <Flex
          pt={{ xl: 10 }}
          pb={{ xl: 5 }}
          align="center"
          justify="space-between"
        >
          <Box w="50%" px={4} h={14} bgColor="#E7FAF8" color="ojaSkyBlue">
            <Text
              fontSize="sm"
              lineHeight="150%"
              fontWeight={600}
              letterSpacing="0.2px"
            >
              You Send
            </Text>
            <Text
              fontSize="lg"
              fontWeight={600}
              letterSpacing="0.2px"
              fontFamily="Avenir Next"
            >
              {formatMoney(_in.amount, _in.code)}
            </Text>
          </Box>
          <Box
            w="50%"
            px={4}
            h={14}
            ml="0.5"
            bgColor="#E7FAF8"
            color="gray.800"
          >
            <Text
              fontSize="sm"
              lineHeight="150%"
              fontWeight={600}
              letterSpacing="0.2px"
            >
              You Receive
            </Text>
            <Text
              fontSize="lg"
              fontWeight={600}
              letterSpacing="0.2px"
              fontFamily="Avenir Next"
            >
              {formatMoney(_out.amount, _out.code)}
            </Text>
          </Box>
        </Flex>
        <Box>
          <Flex
            pos="relative"
            role="button"
            align="center"
            color="ojaYellow"
            onClick={() => onToggle()}
            aria-describedby="see-deal-breakdown"
          >
            <Text fontSize="xs" letterSpacing="0.2px">
              See Deal Breakdown
            </Text>
            <Icon
              as={!isOpen ? FiChevronRight : FiChevronDown}
              className={!isOpen ? 'see-deal-arrow' : ''}
            />
          </Flex>
          <Collapse in={isOpen} animateOpacity>
            <Box p={4} bgColor="rgba(0, 208, 190, 0.05)">
              <Flex align="center">
                <Icon
                  as={FiMinus}
                  rounded="full"
                  bgColor="ojaDark"
                  color="ojaSkyBlue"
                />
                <Flex ml={4} align="center">
                  <Text fontSize="md" letterSpacing="-0.2px" fontWeight={600}>
                    {_inCurrency?.symbol}2.5%
                  </Text>
                  <Text ml={2} fontSize="xs" letterSpacing="-0.2px">
                    Transaction fee
                    <Text ml={1} as="span" fontWeight={600}>
                      (= {_inCurrency?.symbol}
                      {0.025 * _in.amount})
                    </Text>
                  </Text>
                </Flex>
              </Flex>
              <Flex align="center">
                <Icon
                  rounded="full"
                  as={FiPlusCircle}
                  bgColor="ojaDark"
                  color="ojaSkyBlue"
                />
                <Flex ml={4} align="center">
                  <Text fontSize="md" letterSpacing="-0.2px" fontWeight={600}>
                    {_inCurrency?.symbol}0.5%
                  </Text>
                  <Text ml={2} fontSize="xs" letterSpacing="-0.2px">
                    with a
                    <Text mx={1} as="span" fontWeight={600}>
                      {_inCurrency?.symbol}
                      {0.005 * _in.amount} cap
                    </Text>
                    Bank Settlement fee per pair
                  </Text>
                </Flex>
              </Flex>
              <Flex align="center">
                <Icon
                  rounded="full"
                  as={EqualIcon}
                  bgColor="ojaDark"
                  color="ojaSkyBlue"
                />
                <Flex ml={4} align="center" letterSpacing="-0.2px">
                  <Text fontSize="md" fontWeight={600}>
                    {_outCurrency?.symbol}
                    {_rate}
                  </Text>
                  <Text ml={2} fontSize="xs">
                    {_inCurrency?.name} to {_outCurrency?.name} conversion rate
                    (<Icon as={BiRefresh} /> 2 hours)
                  </Text>
                </Flex>
              </Flex>
            </Box>
          </Collapse>
        </Box>
        <Box mt={{ xl: 5 }}>
          <CustomButton
            px={8}
            w="70%"
            h={{ lg: 14 }}
            type="button"
            boxShadow="lg"
            rounded="none"
            fontWeight={600}
            isLoading={loading}
            onClick={proceed}
            _focus={{ outline: 'none' }}
            title="COMPLETE DEAL"
            colorScheme="ojaColorSchemaSkyBlue"
            fontSize={{ base: 'sm', xl: 'md' }}
            rightIcon={
              <FiArrowRight fontSize={20} className="auth-btn-arrow" />
            }
          />
        </Box>
      </Box>
    </Box>
  )
}

export default CreateForm
