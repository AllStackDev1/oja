import React from 'react'
import {
  Box,
  Modal,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalCloseButton
} from '@chakra-ui/react'
import CreateDealForm from './Form'

interface Props {
  isOpen: boolean
  onClose(): void
}

const CreateDealModal: React.FC<Props> = ({ isOpen, onClose }): JSX.Element => {
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
          <Box py={12} px={{ base: 8, lg: 14 }}>
            <CreateDealForm />
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default CreateDealModal
