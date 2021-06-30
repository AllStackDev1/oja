import React, { lazy } from 'react'
import { Switch, Redirect, Route, RouteComponentProps } from 'react-router-dom'
import { Box } from '@chakra-ui/react'

const Login = lazy(() => import('./login'))
const Signup = lazy(() => import('./signup'))
// const Logout = lazy(() => import('./logout'))
const OtpVerification = lazy(() => import('./otp-verification'))

const Auth: React.FC<RouteComponentProps> = (props): JSX.Element => {
  const {
    match: { url }
  } = props
  return (
    <Box fontFamily="body" overflowX="hidden">
      <Switch>
        <Redirect exact from={`${url}`} to={`${url}/login`} />
        <Route exact path={`${url}/login`} component={Login} />
        <Route exact path={`${url}/sign`} component={Signup} />
        <Route exact path={`${url}/2fa`} component={OtpVerification} />
        <Redirect from="*" to="/404" />
      </Switch>
    </Box>
  )
}

export default Auth
