import React from 'react'
import {
  Box,
  Text,
  Flex,
  Modal,
  Heading,
  ModalBody,
  ModalFooter,
  ModalOverlay,
  ModalContent
} from '@chakra-ui/react'
import CheckIcon from 'components/SVG/CheckIcon'
import { CustomButton } from 'components/Auth'
import { FiArrowRight } from 'react-icons/fi'
import { useHistory } from 'react-router-dom'

const SuccessModal: React.FC<{ amount: string; code: string }> = ({
  amount,
  code
}): JSX.Element => {
  const { replace } = useHistory()
  return (
    <Modal
      size="2xl"
      isCentered
      isOpen={true}
      onClose={() => null}
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent bg="white" rounded="xl" mt={{ base: 44, lg: 'unset' }}>
        <ModalBody p={0} mb={6}>
          <Flex
            py={16}
            w="full"
            justify="center"
            bg="rgba(106, 200, 149, 0.15)"
          >
            <CheckIcon />
          </Flex>
          <Box px={40} textAlign="center" pt={10} w="full" justify="center">
            <Heading fontSize="2xl">Success! Funds Confirmed</Heading>
            <Text mt={5} fontSize="sm">
              Your {code} wallet have been funded with {amount}, continue to
              dashboard
            </Text>
          </Box>
        </ModalBody>
        <ModalFooter mb={4} w="full" justifyContent="center">
          <CustomButton
            px={6}
            w="45%"
            d="flex"
            rounded="md"
            type="submit"
            color="ojaDark"
            bgColor="white"
            borderWidth={1}
            borderColor="ojaDark"
            title="Continue to Dashboard"
            _hover={{ bgColor: 'white' }}
            fontSize={{ base: 'sm', xl: 'md' }}
            onClick={() => replace('/dashboard/deals')}
            rightIcon={
              <FiArrowRight fontSize={20} className="auth-btn-arrow" />
            }
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default SuccessModal
