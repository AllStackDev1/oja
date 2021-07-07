import React from 'react'
import { Box, Text, Heading, Grid, GridItem } from '@chakra-ui/react'
import { CustomInputGroup } from 'components/Forms'

const DebitFrom = (): JSX.Element => {
  const data = [
    {
      id: 'accountNumber',
      type: 'number',
      label: 'Enter account number',
      placeholder: '23843001203'
    },
    {
      id: 'bank',
      type: 'text',
      label: 'Bank',
      placeholder: 'ABC Bank'
    },
    {
      id: 'accountName',
      type: 'text',
      label: 'Account Name',
      placeholder: 'John Doe'
    }
  ]
  return (
    <GridItem>
      <Box mb={3}>
        <Heading fontWeight={400} fontSize="xl">
          Account to Credit
        </Heading>
        <Text mt={1} fontSize="sm" lineHeight={4} color="gray.600">
          Lorem ipsum dolor sit amet, consectetur ad eiusmod tempor incididunt
          ut lab.
        </Text>
      </Box>
      <Box p={6} rounded="sm" boxShadow="main">
        <Grid rowGap={8}>
          {data.map(d => (
            <GridItem>
              <CustomInputGroup
                h={12}
                border={0}
                rounded={0}
                isRequired
                id={d.id}
                type={d.type}
                name={d.id}
                label={d.label}
                placeholder={d.placeholder}
                // onBlur={handleBlur}
                // error={errors.lastName}
                // onChange={handleChange}
                _focus={{ outline: 'none' }}
                // touched={!!touched.lastName}
                // defaultValue={values.lastName}
              />
            </GridItem>
          ))}
        </Grid>
      </Box>
    </GridItem>
  )
}

export default DebitFrom
