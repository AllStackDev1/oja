import React from 'react'
import { useHistory } from 'react-router-dom'

import useAuth from 'context/Auth'

import Splash from 'components/Loading/Splash'

const LogOut: React.FC = () => {
  const { logout } = useAuth()
  const history = useHistory()

  React.useEffect(() => {
    setTimeout(() => {
      logout()
      history.push('/auth/login')
    }, 200)
  })

  return <Splash text="logging off" />
}

export default LogOut
