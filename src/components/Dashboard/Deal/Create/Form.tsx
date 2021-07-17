import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import ReactFlagsSelect from 'react-flags-select'
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
import { CustomInput } from 'components/Forms'
import { IPhoneInputData } from 'interface'
import { formatMoney } from 'utils/helpers'

import useAuth from 'context/Auth'
import { CustomButton } from 'components/Auth'
import { BiRefresh } from 'react-icons/bi'

const HeroForm: React.FC<IPhoneInputData> = ({
  data,
  countries,
  customLabels
}): JSX.Element => {
  const [_in, setIn] = React.useState({ amount: 1000, code: 'US' })
  const [_out, setOut] = React.useState({ amount: 0, code: 'NG' })
  const [_rate, setRate] = React.useState(1)
  const [isLoading, setLoading] = React.useState(false)
  const { isOpen, onToggle } = useDisclosure()
  const { isAuthenticated } = useAuth()
  const history = useHistory()

  React.useEffect(() => {
    const arr = Object.values(data || {})
    const rates = arr?.find(d => d.code === _in.code)?.rates
    if (rates) {
      const rate = rates.find(r => r.name === _out.code)?.rate
      if (rate) {
        setRate(parseFloat(rate.$numberDecimal))
        setOut(p => ({
          ...p,
          amount: _in.amount * parseFloat(rate.$numberDecimal)
        }))
      }
    }
  }, [data, _in.code, _out.code])

  const formFields = [
    {
      id: 'in',
      selected: _in.code,
      placeholder: 'Enter an amount...',
      onSelect: (code: string) => setIn(p => ({ ...p, code })),
      countries: countries?.filter(c => c !== _out.code),
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        setIn(p => ({ ...p, amount: Number(e.target.value) || 1 }))
        setOut(p => ({ ...p, amount: _rate * (Number(e.target.value) || 1) }))
      }
    },
    {
      id: 'out',
      readOnly: true,
      placeholder: '',
      onChange: () => null,
      countries: countries?.filter(c => c !== _in.code),
      selected: _out.code,
      onSelect: (code: string) => setOut(p => ({ ...p, code }))
    }
  ]

  const getCurrency = (id: string) => {
    const arr = Object.values(data || {})
    return arr?.find(d => d.code === id)?.currency
  }

  const _inCurrency = getCurrency(_in.code)
  const _outCurrency = getCurrency(_out.code)

  const handleComplete = () => {
    setLoading(true)
    const data = JSON.stringify({
      rate: _rate,
      transactionFee:
        Math.round(0.025 * _in.amount * 100 + Number.EPSILON) / 100,
      settlementFee:
        Math.round(0.005 * _in.amount * 100 + Number.EPSILON) / 100,
      debit: {
        bankName: '',
        swiftCode: '',
        accountName: '',
        accountNumber: '',
        currencySymbol: _inCurrency?.symbol,
        amount: Math.round(_in.amount * 100 + Number.EPSILON) / 100
      },
      credit: {
        bankName: '',
        swiftCode: '',
        accountName: '',
        accountNumber: '',
        currencySymbol: _outCurrency?.symbol,
        amount: Math.round(_out.amount * 100 + Number.EPSILON) / 100
      }
    })
    sessionStorage.setItem('new-deal', data)
    let link = '/dashboard/vending'
    if (!isAuthenticated().authToken) {
      link = '/auth/login'
    }
    setTimeout(() => {
      setLoading(false)
      history.push(link)
    }, 200)
  }

  return (
    <Box w="lg" id="create-deal-form">
      <Box mt={4}>
        {formFields.map((ff, i) => (
          <Box key={i}>
            <Flex align="center" justify="space-between">
              <Box w={{ xl: '70%' }}>
                <CustomInput
                  min={1}
                  id={ff.id}
                  rounded={0}
                  color="#000"
                  name={ff.id}
                  type="number"
                  bgColor="white"
                  pl={{ xl: 10 }}
                  lineHeight="150%"
                  onChange={ff.onChange}
                  fontSize={{ xl: '2xl' }}
                  isReadOnly={ff.readOnly}
                  placeholder={ff.placeholder}
                  h={{ base: 12, xl: '4.5rem' }}
                  value={i === 0 ? _in.amount : _out.amount}
                  cursor={ff.readOnly ? 'pointer' : 'inherit'}
                />
              </Box>
              <Box w={{ xl: '28%' }}>
                <ReactFlagsSelect
                  className="menu-flags"
                  selected={ff.selected}
                  onSelect={ff.onSelect}
                  countries={ff.countries}
                  customLabels={customLabels}
                  selectButtonClassName="menu-flags-button"
                />
              </Box>
            </Flex>
            {!i && (
              <Divider
                h={10}
                opacity={1}
                orientation="vertical"
                borderLeftWidth={3}
                borderLeftColor="ojaSkyBlue"
              />
            )}
          </Box>
        ))}
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
                {_inCurrency?.code} {formatMoney(_in.amount)}
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
                {getCurrency(_out.code)?.code} {formatMoney(_out.amount)}
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
                      {_inCurrency?.name} to {_outCurrency?.name} conversion
                      rate (<Icon as={BiRefresh} /> 2 hours)
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
              isLoading={isLoading}
              onClick={handleComplete}
              _focus={{ outline: 'none' }}
              title="COMPLETE TRANSACTION"
              colorScheme="ojaColorSchemaSkyBlue"
              fontSize={{ base: 'sm', xl: 'md' }}
              rightIcon={
                <FiArrowRight fontSize={20} className="auth-btn-arrow" />
              }
            />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

HeroForm.propTypes = {
  countries: PropTypes.any.isRequired,
  customLabels: PropTypes.any.isRequired
}

export default HeroForm
