/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext } from 'react'
import PropTypes from 'prop-types'
import { useToast } from '@chakra-ui/react'

import http from 'utils/httpFacade'
import { BASE_URL } from 'utils/configs'
import {
  IDeal,
  IApiContext,
  UpdateIUser,
  ResponsePayload,
  VerifyOtpPayloadDto,
  ResendOtpPayloadDto,
  RegisterUserPayloadDto,
  LoginDto
} from 'interface'

const ApiContext = createContext({})

export const ApiContextProvider: React.FC = ({ children }) => {
  const toast = useToast()

  // #region AUTH
  const register = async (payload: RegisterUserPayloadDto) => {
    let res: ResponsePayload<Record<string, string>, string> = {}
    try {
      res = await http.post({
        url: `${BASE_URL}/auth/register`,
        body: JSON.stringify(payload)
      })
      toast({
        title: res.message,
        description: `An OTP has been sent to ${res.data?.phoneNumber}`,
        status: 'success',
        duration: 5000,
        position: 'top-right'
      })
    } catch (error: any) {
      toast({
        title: 'Error occurred',
        description:
          error?.message || error?.data?.message || 'Unexpected network error.',
        status: 'error',
        duration: 5000,
        position: 'top-right'
      })
      res.success = false
    }
    return res
  }

  const verifyOTP = async (payload: VerifyOtpPayloadDto) => {
    let res: ResponsePayload<Record<string, string>, string> = {}
    try {
      res = await http.post({
        url: `${BASE_URL}/auth/verify-otp`,
        body: JSON.stringify(payload)
      })
      toast({
        title: 'Access granted (200)',
        description: res.message,
        status: 'success',
        duration: 5000,
        position: 'top-right'
      })
    } catch (error: any) {
      toast({
        title: 'Error occurred',
        description:
          error?.message || error?.data?.message || 'Unexpected network error.',
        status: 'error',
        duration: 5000,
        position: 'top-right'
      })
      res.success = false
    }
    return res
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

  const login = async (
    payload: LoginDto
  ): Promise<ResponsePayload<string, string>> => {
    let res: ResponsePayload<any, string> = {}
    try {
      res = await http.post({
        url: `${BASE_URL}/auth/login`,
        body: JSON.stringify(payload)
      })
      toast({
        duration: 5000,
        status: 'success',
        position: 'top-right',
        title: res.data?.to
          ? 'Login successful'
          : `Welcome back ${res.data?.user?.firstName}`,
        description: res.data?.to
          ? `An OTP has been sent to ${res.data?.to}`
          : ''
      })
    } catch (error: any) {
      toast({
        title: 'Error occurred',
        description:
          error?.message || error?.data?.message || 'Unexpected network error.',
        status: 'error',
        duration: 5000,
        position: 'top-right'
      })
      res.success = false
    }
    return res
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

  const updateProfile = async (payload: UpdateIUser) => {
    return await http.patch({
      url: `${BASE_URL}/admin/update-profile`,
      body: JSON.stringify(payload)
    })
  }

  const updateUser = async (id: string, payload: UpdateIUser) => {
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

  // #region CURRENCIES
  const getCurrencies = async (query: Record<string, any>) => {
    return await http.get({ url: `${BASE_URL}/currencies`, query })
  }
  // #endregion

  // #region DEAL
  const createDeal = async (payload: IDeal) => {
    const result: ResponsePayload<Record<string, string>, string> = {
      success: true
    }
    try {
      const response = await http.post({
        url: `${BASE_URL}/deals`,
        body: JSON.stringify(payload)
      })
      result.data = response.data
      toast({
        duration: 5000,
        status: 'success',
        position: 'top-right',
        title: response.message,
        description: "Your part is done, sit back and let's do the work now"
      })
    } catch (error: any) {
      toast({
        title: 'Error occurred',
        description:
          error?.message || error?.data?.message || 'Unexpected network error.',
        status: 'error',
        duration: 5000,
        position: 'top-right'
      })
      result.success = false
    }
    return result
  }

  const getDeal = async (id: string) => {
    return await http.get({ url: `${BASE_URL}/deals/${id}` })
  }

  const getDeals = async (payload: any) => {
    return await http.get({ url: `${BASE_URL}/deals/`, query: payload })
  }

  const getActiveDealsWithTheirLatestTransaction = async () => {
    return await http.get({
      url: `${BASE_URL}/deals/active-with-their-latest-transaction`
    })
  }

  // #endregion

  return (
    <ApiContext.Provider
      value={{
        login,
        getDeal,
        getUser,
        getUsers,
        getDeals,
        register,
        verifyOTP,
        resendOTP,
        updateUser,
        deleteUser,
        createDeal,
        verifyEmail,
        deleteUsers,
        getCurrencies,
        getUsersCount,
        updateProfile,
        getActiveDealsWithTheirLatestTransaction
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
