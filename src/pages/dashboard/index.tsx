import React, { lazy } from 'react'
import { Switch, Redirect, Route, RouteComponentProps } from 'react-router-dom'

const Home = lazy(() => import('./home'))
const Vending = lazy(() => import('./vending'))
const Wallet = lazy(() => import('./wallet'))

const Dashboard: React.FC<RouteComponentProps> = (props): JSX.Element => {
  const {
    match: { url }
  } = props
  return (
    <Switch>
      <Redirect exact from={`${url}`} to={`${url}/home`} />
      <Route exact path={`${url}/home`} component={Home} />
      <Route exact path={`${url}/vending`} component={Vending} />
      <Route exact path={`${url}/wallet`} component={Wallet} />
      <Redirect from="*" to="/404" />
    </Switch>
  )
}

export default Dashboard
