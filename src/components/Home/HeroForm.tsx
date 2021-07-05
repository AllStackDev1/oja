import React from 'react'
import { useFormik } from 'formik'
import ReactFlagsSelect from 'react-flags-select'
import {
  Box,
  Icon,
  Flex,
  Text,
  Button,
  Divider,
  useToast,
  Collapse,
  useDisclosure
} from '@chakra-ui/react'
import { CustomInput } from 'components/Forms'
import {
  FiChevronDown,
  FiChevronRight,
  FiMinus,
  FiPlusCircle
} from 'react-icons/fi'
import { EqualIcon } from 'components/SVG'

const HeroForm = (): JSX.Element => {
  const { isOpen, onToggle } = useDisclosure()
  const toast = useToast()

  const formik = useFormik({
    initialValues: {
      inValue: '',
      outValue: '',
      inCountry: 'US',
      outCountry: 'NG'
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

  type IFormField = 'inValue' | 'outValue'

  const formFields = ['in', 'out']

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    setFieldValue,
    handleSubmit
  } = formik

  const countriesLabels = { US: 'USD', GB: 'GBP', NG: 'NGR', GH: 'GHS' }

  return (
    <Box w="lg" id="hero-form">
      <form style={{ marginTop: '2rem' }} onSubmit={handleSubmit}>
        {formFields.map((ff, i) => (
          <Box key={ff}>
            <Flex align="center" justify="space-between">
              <Box w={{ xl: '70%' }}>
                <CustomInput
                  rounded={0}
                  color="#000"
                  type="number"
                  bgColor="white"
                  pl={{ xl: 10 }}
                  lineHeight="150%"
                  id={`${ff}Value`}
                  name={`${ff}Value`}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  fontSize={{ xl: '2xl' }}
                  placeholder="USD 1,000.00"
                  h={{ base: 12, xl: '4.5rem' }}
                  error={errors[`${ff}Value` as IFormField]}
                  touched={!!touched[`${ff}Value` as IFormField]}
                  defaultValue={values[`${ff}Value` as IFormField]}
                />
              </Box>
              <Box w={{ xl: '28%' }}>
                <ReactFlagsSelect
                  className="menu-flags"
                  customLabels={countriesLabels}
                  countries={Object.keys(countriesLabels)}
                  selectButtonClassName="menu-flags-button"
                  selected={values[`${ff}Country` as IFormField]}
                  onSelect={code => setFieldValue(`${ff}Country`, code)}
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
        <Box px={{ xl: 10 }}>
          <Flex
            pt={{ xl: 10 }}
            pb={{ xl: 5 }}
            align="center"
            justify="space-between"
          >
            <Box>
              <Text
                fontSize="md"
                fontWeight={700}
                color="ojaSkyBlue"
                letterSpacing="0.2px"
              >
                Amount Pair
              </Text>
              <Text
                fontSize="lg"
                fontWeight={600}
                letterSpacing="0.2px"
                fontFamily="Avenir Next"
              >
                20
              </Text>
            </Box>
            <Flex>
              <Box
                px={4}
                h={14}
                minW={{ xl: 32 }}
                bgColor="#E7FAF8"
                color="ojaSkyBlue"
              >
                <Text fontSize="md" fontWeight={600} letterSpacing="0.2px">
                  Your Send
                </Text>
                <Text
                  fontSize="lg"
                  fontWeight={600}
                  letterSpacing="0.2px"
                  fontFamily="Avenir Next"
                >
                  USD 1,022
                </Text>
              </Box>
              <Box
                px={4}
                h={14}
                minW={{ xl: 32 }}
                ml="0.5"
                bgColor="#E7FAF8"
                color="gray.800"
              >
                <Text fontSize="md" fontWeight={600} letterSpacing="0.2px">
                  You Recieve
                </Text>
                <Text
                  fontSize="lg"
                  fontWeight={600}
                  letterSpacing="0.2px"
                  fontFamily="Avenir Next"
                >
                  NGN 1,200.00
                </Text>
              </Box>
            </Flex>
          </Flex>
          <Box>
            <Flex
              pos="relative"
              role="button"
              align="center"
              color="ojaYellow"
              onClick={() => onToggle()}
              aria-describedby="see-trasaction-breakdown"
            >
              <Text fontSize="xs" letterSpacing="0.2px">
                See Transaction Breakdown
              </Text>
              <Icon
                as={!isOpen ? FiChevronRight : FiChevronDown}
                className={!isOpen ? 'see-tran-arrow' : ''}
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
                      $2.5%
                    </Text>
                    <Text ml={2} fontSize="xs" letterSpacing="-0.2px">
                      Transaction fee
                      <Text ml={1} as="span" fontWeight={600}>
                        (= $15)
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
                      $0.5%
                    </Text>
                    <Text ml={2} fontSize="xs" letterSpacing="-0.2px">
                      with a
                      <Text mx={1} as="span" fontWeight={600}>
                        $20 cap
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
                      ₦490
                    </Text>
                    <Text ml={2} fontSize="xs">
                      Dollar to Naira conversion rate (2 hours)
                    </Text>
                  </Flex>
                </Flex>
              </Box>
            </Collapse>
          </Box>
          <Box mt={{ xl: 5 }}>
            <Button
              px={10}
              rounded="none"
              boxShadow="lg"
              h={{ md: 14 }}
              fontWeight={600}
              textTransform="uppercase"
              colorScheme="ojaButton"
              _focus={{ outline: 'none' }}
              fontSize={{ base: 'sm', xl: 'lg' }}
            >
              Complete Transaction
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  )
}

HeroForm.propTypes = {}

export default HeroForm
