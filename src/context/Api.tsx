/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext } from 'react'
import PropTypes from 'prop-types'

import http from 'utils/httpFacade'
import { BASE_URL } from 'utils/configs'
import {
  UpdateUserDto,
  VerifyOtpPayloadDto,
  RegisterUserPayloadDto,
  ResendOtpPayloadDto
} from 'interface/user.interface'
import { IApiContext } from 'interface/context.interface'

const ApiContext = createContext({})

export const ApiContextProvider: React.FC = ({ children }) => {
  const URL = BASE_URL + '/auth'
  const register = async (payload: RegisterUserPayloadDto) => {
    return await http.post({
      url: `${URL}/register`,
      body: JSON.stringify(payload)
    })
  }

  const verifyOTP = async (payload: VerifyOtpPayloadDto) => {
    return await http.post({
      url: `${URL}/verify-otp`,
      body: JSON.stringify(payload)
    })
  }

  const resendOTP = async (payload: ResendOtpPayloadDto) => {
    return await http.post({
      url: `${URL}/resend-otp`,
      body: JSON.stringify(payload)
    })
  }

  const login = async (payload: any) => {
    return await http.post({
      url: `${URL}/login`,
      body: JSON.stringify(payload)
    })
  }

  const getUsers = async (query: Record<string, any>) => {
    return await http.get({ url: `${BASE_URL}/users`, query })
  }

  const getUser = async (id: string) => {
    return await http.get({ url: `${BASE_URL}/users/${id}` })
  }

  const updateProfile = async (payload: UpdateUserDto) => {
    return await http.patch({
      url: `${BASE_URL}/admin/update-profile`,
      body: JSON.stringify(payload)
    })
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
        login,
        getUser,
        getUsers,
        register,
        verifyOTP,
        resendOTP,
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
