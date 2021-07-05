/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext } from 'react'
import PropTypes from 'prop-types'

import http from 'utils/httpFacade'
import { BASE_URL } from 'utils/configs'
import { CreateUserDto, UpdateUserDto } from 'interface/user.interface'
import { IApiContext } from 'interface/context.interface'

const ApiContext = createContext({})

export const ApiContextProvider: React.FC = ({ children }) => {
  const auth = async (payload: CreateUserDto) => {
    return await http.post({
      url: `${BASE_URL}/auth`,
      body: JSON.stringify(payload)
    })
  }

  const verifyOTP = async (payload: any) => {
    return await http.post({
      url: `${BASE_URL}/verify-otp`,
      body: JSON.stringify(payload)
    })
  }

  const resendCode = async (payload: any) => {
    return await http.post({
      url: `${BASE_URL}/resend-code`,
      body: JSON.stringify(payload)
    })
  }

  const updateProfile = async (payload: UpdateUserDto) => {
    return await http.patch({
      url: `${BASE_URL}/admin/update-profile`,
      body: JSON.stringify(payload)
    })
  }

  const getUsers = async (query: Record<string, any>) => {
    return await http.get({ url: `${BASE_URL}/users`, query })
  }

  const getUser = async (id: string) => {
    return await http.get({ url: `${BASE_URL}/users/${id}` })
  }

  const updateUser = async (id: string, payload: UpdateUserDto) => {
    return await http.patch({
      url: `${BASE_URL}/users/${id}`,
      body: JSON.stringify(payload)
    })
  }

  const deleteUser = async (id: string) => {
    return await http.delete({
      url: `${BASE_URL}/users/${id}`
    })
  }

  const deleteUsers = async (payload: [string]) => {
    return await http.post({
      url: `${BASE_URL}/users/bulk-delete`,
      body: JSON.stringify(payload)
    })
  }
  // #endregion

  return (
    <ApiContext.Provider
      value={{
        auth,
        getUser,
        getUsers,
        verifyOTP,
        resendCode,
        updateUser,
        deleteUser,
        deleteUsers,
        updateProfile
      }}
    >
      {children}
    </ApiContext.Provider>
  )
}

ApiContextProvider.propTypes = {
  children: PropTypes.node.isRequired
}

const useApi = (): IApiContext => useContext(ApiContext) as IApiContext

export default useApi
