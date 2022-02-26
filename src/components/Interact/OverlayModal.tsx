import React from 'react'
import {
  Text,
  Modal,
  ModalBody,
  ModalOverlay,
  ModalContent
} from '@chakra-ui/react'

const VerifyFundOverlay: React.FC = (): JSX.Element => {
  return (
    <Modal
      isOpen={true}
      onClose={() => null}
      size="xl"
      isCentered
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent bg="transparent" shadow="none">
        <ModalBody textAlign="center">
          <Text
            mb={3}
            color="white"
            fontSize="3xl"
            className="loading-text loading-text-b"
          >
            Verifying your transaction
          </Text>
          <Text mt={3} color="white" fontSize="xl">
            This could take up to 2mins please stay on this screen
          </Text>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default VerifyFundOverlay
