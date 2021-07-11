import React from 'react'
import { useHistory } from 'react-router-dom'

import useAuth from 'context/Auth'

import Splash from 'components/Loading/Splash'

const Logout: React.FC = () => {
  const { logout, setSession } = useAuth()
  const history = useHistory()

  React.useEffect(() => {
    setTimeout(() => {
      logout()
      setSession(true)
      history.push('/auth/login')
    }, 200)
  })

  return <Splash text="logging off" />
}

export default Logout
