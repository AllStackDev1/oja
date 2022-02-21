import React from 'react'
import Wrapper from 'containers/Layout/Wrapper'
import { Box } from '@chakra-ui/react'

const Profile = (): JSX.Element => {
  return (
    <Wrapper
      title="Oj'a. | Profile"
      href="/dashboard/profile"
      content="This is the application dashboard profile page"
    >
      <Box>This is the profile page</Box>
    </Wrapper>
  )
}

export default Profile
