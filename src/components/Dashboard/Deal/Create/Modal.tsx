import React from 'react'
import { useQuery } from 'react-query'
import {
  Box,
  Text,
  Modal,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalCloseButton
} from '@chakra-ui/react'

import useApi from 'context/Api'
import { Small } from 'components/Loading'
import CreateDealForm from './Form'
import { convertArrayToObject, phoneInputData } from 'utils/helpers'
import { ICountry } from 'interface'

interface Props {
  isOpen: boolean
  onClose(): void
}

const CreateDealModal: React.FC<Props> = ({ isOpen, onClose }): JSX.Element => {
  const { getCountries } = useApi()

  const { data, isLoading, error } = useQuery('countries', () =>
    getCountries({ status: true })
  )

  const renderForm = (countries?: ICountry[]) => {
    const countriesData = convertArrayToObject(countries, 'code')
    const data = phoneInputData(countriesData, 'currency')
    return (
      <Box py={12} px={{ base: 8, lg: 14 }}>
        <CreateDealForm {...data} />
      </Box>
    )
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl" isCentered>
      <ModalOverlay />
      <ModalContent
        rounded="xl"
        bg="ojaDark"
        color="white"
        mx={{ base: 5 }}
        mt={{ base: 44, lg: 'unset' }}
      >
        <ModalCloseButton p={2} size="lg" />
        <ModalBody>
          {isLoading && <Small thickness="2px" />}
          {!isLoading && (
            <>{error ? <Text>Error: {error}</Text> : renderForm(data?.data)}</>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default CreateDealModal
