import React from 'react'
import { FormikErrors, FormikTouched } from 'formik'
import {
  Box,
  Flex,
  Text,
  Image,
  Heading,
  Grid,
  GridItem
} from '@chakra-ui/react'

import { IAccountDetails } from 'interface'
import { CustomInputGroup } from 'components/Forms'

interface IFormData {
  name: string
  label: string
  placeholder: string
  isRequired: boolean
}

interface IProps {
  inFlag?: string
  inName?: string
  formData: IFormData[]
  values: IAccountDetails
  errors?: FormikErrors<IAccountDetails>
  touched?: FormikTouched<IAccountDetails>
  handleBlur(e: React.FocusEvent<HTMLInputElement>): void
  handleChange(e: React.ChangeEvent<HTMLInputElement>): void
}

const DebitTo = (props: IProps): JSX.Element => {
  type name = 'accountNumber' | 'bankName' | 'accountName' | 'swiftCode'

  return (
    <GridItem>
      <Box mb={3}>
        <Heading fontWeight={400} fontSize="xl">
          Account to Debit From
        </Heading>
        <Text mt={1} fontSize="sm" lineHeight={4} color="gray.600">
          Lorem ipsum dolor sit amet, consectetur ad eiusmod tempor incididunt
          ut lab.
        </Text>
      </Box>
      <Box p={6} rounded="sm" boxShadow="main" pos="relative">
        <Flex zIndex={10} right={6} pos="absolute">
          <Image
            w={14}
            h={10}
            rounded="full"
            src={props.inFlag}
            alt={props.inName}
          />
        </Flex>
        <Grid rowGap={8}>
          {props.formData.map(d => (
            <GridItem key={d.name}>
              <CustomInputGroup
                h={12}
                border={0}
                type="text"
                rounded={0}
                label={d.label}
                onBlur={props.handleBlur}
                onChange={props.handleChange}
                id={`debit.${d.name}`}
                name={`debit.${d.name}`}
                isRequired={d.isRequired}
                placeholder={d.placeholder}
                _focus={{ outline: 'none' }}
                value={props.values?.[d.name as name]}
                error={props.errors?.[d.name as name]}
                touched={!!props.touched?.[d.name as name]}
              />
            </GridItem>
          ))}
        </Grid>
      </Box>
    </GridItem>
  )
}

export default DebitTo
