import React from 'react'
import { Switch, Route, RouteComponentProps } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

import { Splash } from 'components/Loading'

import Auth from 'pages/auth'
import Landing from 'pages/landing'
import Dashboard from 'pages/dashboard'
import NotFound from 'pages/404'

import PrivateRoute from './private'

const Router: React.FC<RouteComponentProps> = (props): JSX.Element => {
  const {
    location: { pathname }
  } = props

  return (
    <React.Suspense fallback={<Splash />}>
      <AnimatePresence exitBeforeEnter>
        <motion.div
          key={pathname.split('/')[1]}
          initial="pageInitial"
          animate="pageAnimate"
          variants={{
            pageInitial: {
              opacity: 0
            },
            pageAnimate: {
              opacity: 1,
              transition: { duration: 0.5 }
            }
          }}
        >
          <Switch>
            <Route path="/auth" component={Auth} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <Route path="/404" component={NotFound} />
            <Route path="/" component={Landing} />
          </Switch>
        </motion.div>
      </AnimatePresence>
    </React.Suspense>
  )
}

export default Router
