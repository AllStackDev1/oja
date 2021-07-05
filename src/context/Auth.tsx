import React, { useState, createContext, useContext } from 'react'
import PropTypes from 'prop-types'
import { IAuthContext, IStore } from 'interface/context.interface'
import { UserDto } from 'interface/user.interface'

const AuthContext = createContext({})

export const AuthContextProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<Record<string, string> | undefined>()
  const [session, setSession] = useState<boolean>(true)
  const [rememberMe, setRememberMe] = useState<boolean>(false)

  const store = ({ authToken, user }: IStore) => {
    if (authToken) {
      if (rememberMe) {
        window.localStorage.setItem('_ojaut_', authToken)
      } else {
        window.sessionStorage.setItem('_ojaut_', authToken)
      }
    }
    if (user) {
      if (rememberMe) {
        window.localStorage.setItem('_ojauu_', JSON.stringify(user))
      } else {
        window.sessionStorage.setItem('_ojauu_', JSON.stringify(user))
      }
    }
  }

  const isAuthenticated = () => {
    const _ojaut_ =
      window.sessionStorage.getItem('_ojaut_') ||
      window.localStorage.getItem('_ojaut_')
    const _ojauu_ =
      window.sessionStorage.getItem('_ojauu_') ||
      window.localStorage.getItem('_ojauu_')
    if (_ojaut_ && _ojauu_) {
      return { token: _ojaut_, user: JSON.parse(_ojauu_) as UserDto }
    } else {
      return { token: null, user: null }
    }
  }

  const logout = () => {
    setSession(false)
    setUser(undefined)
    window.localStorage.removeItem('_ojauu_')
    window.localStorage.removeItem('_ojaut_')
    window.sessionStorage.removeItem('_ojauu_')
    window.sessionStorage.removeItem('_ojaut_')
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
        setRememberMe,
        isAuthenticated
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
