import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Splash from 'components/Loading/Splash'

import Auth from 'pages/auth'
import Landing from 'pages/landing'
import Dashboard from 'pages/dashboard'
import NotFound from 'pages/404'

import PrivateRoute from './private'

const Router = (): JSX.Element => {
  return (
    <React.Suspense fallback={<Splash />}>
      <Switch>
        <Route path="/auth" component={Auth} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <Route path="/404" component={NotFound} />
        <Route path="/" component={Landing} />
      </Switch>
    </React.Suspense>
  )
}

export default Router
