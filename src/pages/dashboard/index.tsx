import React, { lazy } from 'react'
import { Route, Switch, Redirect, RouteComponentProps } from 'react-router-dom'

const Deal = lazy(() => import('./deal'))
const Deals = lazy(() => import('./deals'))
const Profile = lazy(() => import('./profile'))
const Funding = lazy(() => import('./funding'))

const Dashboard: React.FC<RouteComponentProps> = (props): JSX.Element => {
  const {
    match: { url }
  } = props
  return (
    <Switch>
      <Redirect exact from={`${url}`} to={`${url}/deals`} />
      <Route exact path={`${url}/deals`} component={Deals} />
      <Route exact path={`${url}/deals/:id`} component={Deal} />
      <Route exact path={`${url}/profile`} component={Profile} />
      <Route exact path={`${url}/funding/:id`} component={Funding} />
      <Redirect from="*" to="/404" />
    </Switch>
  )
}

export default Dashboard
