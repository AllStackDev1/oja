import React from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Fade,
  Text,
  Input,
  IconProps,
  FormLabel,
  InputProps,
  InputGroup,
  FormControl,
  InputLeftAddon,
  InputRightAddon
} from '@chakra-ui/react'
interface ICustomInputGroup extends InputProps {
  error?: string
  label?: string
  touched: boolean
  leftAddon?: IconProps | React.FC
  rightAddon?: IconProps | React.FC
}

const CustomInputGroup: React.FC<ICustomInputGroup> = ({
  id,
  error,
  label,
  touched,
  isRequired,
  leftAddon,
  rightAddon,
  ...rest
}) => {
  const addonProps = {
    px: 0,
    h: rest.h,
    border: 0,
    rounded: 0,
    bgColor: 'white'
  }

  return (
    <FormControl
      id={id || rest.name}
      isRequired={isRequired}
      color={!!error && touched ? 'red.500' : 'gray.500'}
    >
      {label && (
        <FormLabel mb={0} fontSize="sm" fontWeight="500">
          {label}
        </FormLabel>
      )}
      <InputGroup
        borderBottom="1px"
        borderBottomColor={!!error && touched ? 'red.500' : 'gray.500'}
      >
        {leftAddon && <InputLeftAddon {...addonProps} children={leftAddon} />}
        <Input {...rest} />
        {rightAddon && (
          <InputRightAddon {...addonProps} children={rightAddon} />
        )}
      </InputGroup>
      <Fade in={!!error && touched}>
        {!!error && touched && (
          <Box
            borderBottomRadius="md"
            zIndex={10}
            bgColor="white"
            pos="absolute"
            w="full"
            shadow="md"
            p={3}
          >
            <Text
              fontSize="xs"
              color="red.500"
              dangerouslySetInnerHTML={{
                __html: error
              }}
            />
          </Box>
        )}
      </Fade>
    </FormControl>
  )
}

CustomInputGroup.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  isRequired: PropTypes.bool,
  leftAddon: PropTypes.any,
  rightAddon: PropTypes.any,
  id: PropTypes.string.isRequired,
  touched: PropTypes.bool.isRequired
}

export default CustomInputGroup
