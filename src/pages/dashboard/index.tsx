import React, { lazy } from 'react'
import { Switch, Redirect, Route, RouteComponentProps } from 'react-router-dom'

const Home = lazy(() => import('./home'))

const Dashboard: React.FC<RouteComponentProps> = (props): JSX.Element => {
  const {
    match: { url }
  } = props
  return (
    <Switch>
      <Redirect exact from={`${url}`} to={`${url}/home`} />
      <Route exact path={`${url}/home`} component={Home} />
      <Redirect from="*" to="/404" />
    </Switch>
  )
}

export default Dashboard
