import React from 'react'
import PropTypes from 'prop-types'
import { useDropzone } from 'react-dropzone'
import {
  Flex,
  Icon,
  Text,
  Input,
  FormLabel,
  FormControl,
  FormErrorMessage
} from '@chakra-ui/react'

import { IoMdCloudUpload } from 'react-icons/io'
import { FiFileText } from 'react-icons/fi'

const CustomDropzone = ({
  id,
  label,
  error,
  value,
  accept,
  multiple,
  touched,
  onChange,
  isRequired
}) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept,
    multiple,
    onDrop: acceptedFiles => {
      acceptedFiles.forEach(async file => onChange(file))
    }
  })

  return (
    <FormControl id={id} isRequired={isRequired} isInvalid={error && touched}>
      {label && (
        <FormLabel fontSize={{ base: 'xs', lg: 'sm' }} fontWeight="400">
          {label}
        </FormLabel>
      )}
      <Flex
        h={{ base: 32, xl: 48 }}
        my={5}
        w="full"
        rounded="md"
        border="2px dashed rgba(0, 0, 0, 0.4)"
        {...getRootProps({ className: 'dropzone' })}
      >
        <Input {...getInputProps()} />
        <Flex w="full" direction="column" align="center" justify="center">
          {value ? (
            <Flex>
              <Icon as={FiFileText} boxSize={5} />
              {value.name}
            </Flex>
          ) : (
            <>
              <Icon as={IoMdCloudUpload} boxSize={{ base: 8, xl: 10 }} />
              <Text fontSize="sm">Select or Drag a file to upload</Text>
            </>
          )}
        </Flex>
      </Flex>
      <FormErrorMessage fontSize={{ base: 'xs', lg: 'sm' }}>
        {error}
      </FormErrorMessage>
    </FormControl>
  )
}

CustomDropzone.propTypes = {
  id: PropTypes.any,
  label: PropTypes.any,
  error: PropTypes.any,
  touched: PropTypes.any,
  isRequired: PropTypes.any,
  value: PropTypes.any,
  accept: PropTypes.any,
  multiple: PropTypes.any,
  onChange: PropTypes.func.isRequired
}

export default CustomDropzone
