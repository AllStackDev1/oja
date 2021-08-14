import React from 'react'
import { Flex, Icon, Link } from '@chakra-ui/react'
import { FaFacebookSquare } from 'react-icons/fa'

import { GoogleIcon } from 'components/SVG'
import CustomButton from './CustomButton'
import { BASE_URL } from 'utils/configs'

const SocialButtons: React.FC<{ type?: string }> = ({
  type = 'up'
}): JSX.Element => {
  return (
    <Flex justify="space-between" align="center">
      <Link href={`${BASE_URL}/auth/facebook`}>
        <CustomButton
          mr={1}
          shadow="lg"
          fontSize="sm"
          bgColor="white"
          color="gray.700"
          _hover={{ bgColor: 'none' }}
          title={`Sign ${type} with Facebook`}
          leftIcon={<FaFacebookSquare color="#385997" fontSize={30} />}
        />
      </Link>

      <Link href={`${BASE_URL}/auth/google`}>
        <CustomButton
          ml={1}
          shadow="lg"
          fontSize="sm"
          color="gray.700"
          bgColor="white"
          _hover={{ bgColor: 'none' }}
          title={`Sign ${type} with Google`}
          leftIcon={<Icon as={GoogleIcon} />}
        />
      </Link>
    </Flex>
  )
}

export default SocialButtons
