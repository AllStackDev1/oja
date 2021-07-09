import React, { lazy } from 'react'
import { Switch, Redirect, Route, RouteComponentProps } from 'react-router-dom'
import { Box } from '@chakra-ui/react'

const Login = lazy(() => import('./login'))
const Register = lazy(() => import('./register'))
// const Logout = lazy(() => import('./logout'))
const TwoFactorAuth = lazy(() => import('./two-factor-auth'))

const Auth: React.FC<RouteComponentProps> = (props): JSX.Element => {
  const {
    match: { url }
  } = props
  return (
    <Box fontFamily="body" overflowX="hidden">
      <Switch>
        <Redirect exact from={`${url}`} to={`${url}/login`} />
        <Route exact path={`${url}/login`} component={Login} />
        <Route exact path={`${url}/register`} component={Register} />
        <Route exact path={`${url}/:token`} component={TwoFactorAuth} />
        <Redirect from="*" to="/404" />
      </Switch>
    </Box>
  )
}

export default Auth
