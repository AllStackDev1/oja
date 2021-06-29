import React from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'

import Splash from '../components/Loading/Splash'

// import Auth from 'pages/auth'
import Landing from '../pages/landing'
// import Dashboard from 'pages/dashboard'

// import PrivateRoute from './private'

const Router = () => {
  return (
    <React.Suspense fallback={<Splash />}>
      <Switch>
        {/* <Route path='/auth' component={Auth} /> */}
        <Route path="/" component={Landing} />
        {/* <PrivateRoute
          exact
          path='/dashboard'
          component={Dashboard}
        /> */}
        <Redirect from="*" to="/404" />
      </Switch>
    </React.Suspense>
  )
}

export default Router
