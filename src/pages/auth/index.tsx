import { lazy } from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'

const Login = lazy(() => import('./login'))
const Logout = lazy(() => import('./logout'))
const Signup = lazy(() => import('./signup'))
const OtpVerification = lazy(() => import('./otp-verification'))

export default Pages
