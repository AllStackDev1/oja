import React, { lazy } from 'react'
import { Switch, Redirect, Route, RouteComponentProps } from 'react-router-dom'
import { Box } from '@chakra-ui/react'

import { LandingNav } from 'container/Navbar'
import { LandingFooter } from 'container/Footer'
const Home = lazy(() => import('./home'))

const Landing: React.FC<RouteComponentProps> = (props): JSX.Element => {
  return (
    <Box fontFamily="body" overflowX="hidden">
      <LandingNav {...props} />
      <Switch>
        <Redirect exact from="/" to="/home" />
        <Route exact path="/home" component={Home} {...props} />
        <Redirect from="*" to="/404" />
      </Switch>
      <LandingFooter />
    </Box>
  )
}

export default Landing
