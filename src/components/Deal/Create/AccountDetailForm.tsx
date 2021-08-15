/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { FormikErrors, FormikTouched } from 'formik'
import { Box, Text, Flex, Grid, Heading, GridItem } from '@chakra-ui/react'

import BankSelect from './BankSelect'
import { CustomInputGroup } from 'components/Forms'
import { IAccountDetails, IBank } from 'interface'
import { getNigerianBanks, validateNigerianAccount } from 'utils/helpers'
import * as _ from 'lodash'

interface IProps {
  id?: string
  flag?: string
  name?: string
  values: IAccountDetails
  errors?: FormikErrors<IAccountDetails>
  setFieldValue(x: string, y: any): void
  touched?: FormikTouched<IAccountDetails>
  handleBlur(e: React.FocusEvent<HTMLInputElement>): void
  handleChange(e: React.ChangeEvent<HTMLInputElement>): void
}

const AccountDetailForm: React.FC<IProps> = ({
  id,
  flag,
  name,
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
  setFieldValue
}): JSX.Element => {
  const [banks, setBanks] = React.useState<IBank[]>([])
  const [bank, setBank] = React.useState<IBank>({ name: '', code: '' })

  React.useEffect(() => {
    const fetchBanks = async (func: () => Promise<Record<string, any>>) => {
      const response = await func()
      if (response?.status) {
        setBanks(response?.data || [])
      }
    }
    if (name === 'Naira') {
      fetchBanks(getNigerianBanks)
    } else {
      setBanks([
        { name: 'Test Bank 1', code: '123' },
        { name: 'Test Bank 2', code: '234' }
      ])
    }
  }, [name])

  const handleAccountNumberInput = async (
    e: React.FocusEvent<HTMLInputElement>
  ) => {
    handleBlur(e)
    if (values.accountNumber && bank.code) {
      setFieldValue(`${id}.bank.name`, bank.name)
      setFieldValue(`${id}.bank.code`, bank.code)
      if (name === 'Naira') {
        const response = await validateNigerianAccount(
          values.accountNumber,
          bank.code
        )
        if (response?.status) {
          setFieldValue(`${id}.accountName`, response.data?.account_name)
        }
      } else {
        setFieldValue(`${id}.accountName`, 'DUMMY ACCOUNT NAME')
      }
    }
  }

  return (
    <GridItem>
      <Box mb={3} pos="relative">
        <Heading fontWeight={400} fontSize="xl">
          Account to {_.upperFirst(id)}
        </Heading>
        <Text mt={1} fontSize="sm" lineHeight={4} color="gray.600">
          Lorem ipsum dolor sit amet, consectetur ad eiusmod tempor incididunt
          ut lab.
        </Text>
        <Flex top={5} right={6} pos="absolute">
          <Text fontSize="4xl">{flag}</Text>
        </Flex>
      </Box>
      <Box p={6} rounded="sm" boxShadow="main">
        <Grid rowGap={8}>
          <GridItem>
            <BankSelect
              selected={bank}
              options={banks}
              error={errors?.bank?.name}
              onSelect={(b: IBank) => setBank(b)}
              touched={!!touched?.bank?.name}
            />
          </GridItem>

          <GridItem
            h={12}
            border={0}
            isRequired
            rounded={0}
            type="text"
            as={CustomInputGroup}
            label="Account Number"
            placeholder="23843001203"
            onChange={handleChange}
            id={`${id}.accountNumber`}
            _focus={{ outline: 'none' }}
            name={`${id}.accountNumber`}
            value={values?.accountNumber}
            error={errors?.accountNumber}
            onBlur={handleAccountNumberInput}
            touched={!!touched?.accountNumber}
            rightAddon={
              values?.accountName ? (
                <Text as="span" fontSize="sm" fontWeight={600}>
                  ({values?.accountName})
                </Text>
              ) : undefined
            }
          />

          {name === 'Dollar' && (
            <GridItem
              h={12}
              border={0}
              isRequired
              rounded={0}
              type="text"
              onBlur={handleBlur}
              as={CustomInputGroup}
              placeholder="1234567"
              label="Routing Number"
              onChange={handleChange}
              _focus={{ outline: 'none' }}
              id={`${id}.bank.routingNumber`}
              name={`${id}.bank.routingNumber`}
              value={values?.bank?.routingNumber}
              error={errors?.bank?.routingNumber}
              touched={!!touched?.bank?.routingNumber}
            />
          )}

          <GridItem
            h={12}
            border={0}
            rounded={0}
            type="text"
            label="Swift Code"
            onBlur={handleBlur}
            as={CustomInputGroup}
            placeholder="ACCDCCBS"
            onChange={handleChange}
            _focus={{ outline: 'none' }}
            id={`${id}.bank.swiftCode`}
            name={`${id}.bank.swiftCode`}
            value={values?.bank?.swiftCode}
            error={errors?.bank?.swiftCode}
            touched={!!touched?.bank?.swiftCode}
          />
        </Grid>
      </Box>
    </GridItem>
  )
}

export default AccountDetailForm
