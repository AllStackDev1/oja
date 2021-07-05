import React, { lazy } from 'react'
import { Switch, Redirect, Route, RouteComponentProps } from 'react-router-dom'
import { Box } from '@chakra-ui/react'

import { LandingNav } from 'containers/Layout/Navbar'
import { LandingFooter } from 'containers/Layout/Footer'
const Home = lazy(() => import('./home'))

const Landing: React.FC<RouteComponentProps> = (props): JSX.Element => {
  const {
    location: { pathname }
  } = props

  const indexPath = pathname.split('/')[1]
  if (indexPath === 'auth' || indexPath === 'dasboard') {
    return <Redirect to="/404" />
  }
  return (
    <Box fontFamily="body" overflowX="hidden">
      <LandingNav {...props} />
      <Switch>
        <Redirect exact from="/" to="/home" />
        <Route path="/home" component={Home} />
        <Route path="/home-2" component={Home} />
        <Redirect from="*" to="/404" />
      </Switch>
      <LandingFooter {...props} />
    </Box>
  )
}

export default Landing
