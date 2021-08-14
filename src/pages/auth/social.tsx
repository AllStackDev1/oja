/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { RouteComponentProps } from 'react-router-dom'

// context
import useAuth from 'context/Auth'
import useApi from 'context/Api'

import ReloadCard from 'components/ReloadCard'

interface RouteParams {
  token: string
}

const Social: React.FC<RouteComponentProps<RouteParams>> = ({
  history: { replace },
  match: {
    params: { token }
  }
}): JSX.Element => {
  document.title = 'Authenticating...'
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState(null)
  const { store, setSession } = useAuth()
  const { getProfile } = useApi()

  React.useEffect(() => {
    const fetchUser = async () => {
      const res = await getProfile()
      store({ user: res?.data?.user })
      setTimeout(() => {
        setIsLoading(false)
        replace('/dashboard/deals')
      }, 250)
    }
    try {
      if (!token) return replace('/auth/login')
      const { authToken, otpResponse } = JSON.parse(atob(token))
      if (authToken) {
        setSession(true)
        store({ authToken })
        fetchUser()
      }
      if (otpResponse) {
        replace(
          `/auth/${btoa(
            JSON.stringify({
              phoneNumber: otpResponse?.to || '',
              pinId: otpResponse?.pinId || ''
            })
          )}`
        )
      }
    } catch (err: any) {
      console.log(err)
      setError(err.message)
    }
  }, [token])

  return isLoading || error ? (
    <ReloadCard
      w="100vw"
      h="100vh"
      bg="white"
      error={error}
      justify="center"
      refetch={() => null}
      text="Authenticating"
      isLoading={isLoading}
    />
  ) : (
    <div />
  )
}

export default Social
