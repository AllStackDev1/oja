import React, { lazy } from 'react'
import { Switch, Redirect, Route, RouteComponentProps } from 'react-router-dom'
import { Box } from '@chakra-ui/react'
import { Fade } from 'react-awesome-reveal'

import { LandingNav } from 'containers/Layout/Navbar'
import { LandingFooter } from 'containers/Layout/Footer'

const Home = lazy(() => import('./home'))

const Landing: React.FC<RouteComponentProps> = (props): JSX.Element => {
  const {
    location: { pathname }
  } = props

  const indexPath = pathname.split('/')[1]
  if (indexPath === 'auth' || indexPath === 'dashboard') {
    return <Redirect to="/404" />
  }
  return (
    <Box bgColor="ojaDark" fontFamily="body" overflowX="hidden">
      <Fade direction="down">
        <LandingNav {...props} />
      </Fade>
      <Switch>
        <Route exact path="/" component={Home} />
        <Redirect from="*" to="/404" />
      </Switch>
      <LandingFooter {...props} />
    </Box>
  )
}

export default Landing
