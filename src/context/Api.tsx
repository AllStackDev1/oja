/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext } from 'react'
import PropTypes from 'prop-types'
// import { useToast } from '@chakra-ui/react'

import http from 'utils/httpFacade'
import { BASE_URL } from 'utils/configs'
import {
  IApiContext,
  UpdateUserDto,
  VerifyOtpPayloadDto,
  ResendOtpPayloadDto,
  RegisterUserPayloadDto
} from 'interface'

const ApiContext = createContext({})

export const ApiContextProvider: React.FC = ({ children }) => {
  // const token = useToast()

  // #region AUTH
  const register = async (payload: RegisterUserPayloadDto) => {
    return await http.post({
      url: `${BASE_URL}/auth/register`,
      body: JSON.stringify(payload)
    })
  }

  const verifyOTP = async (payload: VerifyOtpPayloadDto) => {
    return await http.post({
      url: `${BASE_URL}/auth/verify-otp`,
      body: JSON.stringify(payload)
    })
  }

  const resendOTP = async (payload: ResendOtpPayloadDto) => {
    return await http.post({
      url: `${BASE_URL}/auth/resend-otp`,
      body: JSON.stringify(payload)
    })
  }

  const verifyEmail = async (token: string) => {
    return await http.patch({ url: `${BASE_URL}/auth/verify-email/${token}` })
  }

  const login = async (payload: any) => {
    return await http.post({
      url: `${BASE_URL}/auth/login`,
      body: JSON.stringify(payload)
    })
  }
  // #endregion

  // #region USER
  const getUser = async (id: string) => {
    return await http.get({ url: `${BASE_URL}/users/${id}` })
  }

  const getUsers = async (query: Record<string, any>) => {
    return await http.get({ url: `${BASE_URL}/users`, query })
  }

  const getUsersCount = async (query: Record<string, any>) => {
    return await http.get({ url: `${BASE_URL}/users/count`, query })
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

  // #region COUNTRY
  const getCountries = async (query: Record<string, any>) => {
    return await http.get({ url: `${BASE_URL}/countries`, query })
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
        verifyEmail,
        deleteUsers,
        getCountries,
        getUsersCount,
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
