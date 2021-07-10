import React, { useState, createContext, useContext } from 'react'
import PropTypes from 'prop-types'
import { IAuthContext, IStore } from 'interface/context.interface'
import { UserDto } from 'interface/user.interface'

const AuthContext = createContext({})

export const AuthContextProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<UserDto | undefined>()
  const [session, setSession] = useState(true)
  const [rememberMe, setRememberMe] = useState<boolean>(
    !!sessionStorage.getItem('remember-me')
  )
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const store = ({ authToken, user }: IStore) => {
    if (authToken) {
      if (rememberMe) {
        localStorage.setItem('_ojaut_', authToken)
      } else {
        sessionStorage.setItem('_ojaut_', authToken)
      }
    }
    if (user) {
      sessionStorage.setItem('_ojauu_', JSON.stringify(user))
    }
  }

  const isAuthenticated = (): IStore => {
    const _token =
      sessionStorage.getItem('_ojaut_') || localStorage.getItem('_ojaut_')
    const _user = sessionStorage.getItem('_ojauu_')
    if (_token && _user) {
      return { authToken: _token, user: JSON.parse(_user) as UserDto }
    } else {
      return {}
    }
  }

  const logout = () => {
    setSession(false)
    setUser(undefined)
    localStorage.clear()
    sessionStorage.clear()
    sessionStorage.clear()
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        store,
        logout,
        setUser,
        session,
        setSession,
        rememberMe,
        errorMessage,
        setRememberMe,
        successMessage,
        setErrorMessage,
        isAuthenticated,
        setSuccessMessage
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired
}

const useApi = (): IAuthContext => useContext(AuthContext) as IAuthContext

export default useApi
