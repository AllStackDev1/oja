import React from 'react'
import { useHistory } from 'react-router-dom'

import useAuth from 'context/Auth'

import { Splash } from 'components/Loading'

const Logout: React.FC = () => {
  const { logout } = useAuth()
  const history = useHistory()

  React.useEffect(() => {
    logout()
    setTimeout(() => {
      history.push('/auth/login')
    }, 500)
  })

  return <Splash text="logging off" />
}

export default Logout
