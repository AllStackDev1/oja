import React, { lazy } from 'react'
import { Switch, Redirect, Route, RouteComponentProps } from 'react-router-dom'

const Deal = lazy(() => import('./deal'))
const Deals = lazy(() => import('./deals'))
const Wallet = lazy(() => import('./wallet'))
const CreateDeal = lazy(() => import('./create-deal'))

const Dashboard: React.FC<RouteComponentProps> = (props): JSX.Element => {
  const {
    match: { url }
  } = props
  return (
    <Switch>
      <Redirect exact from={`${url}`} to={`${url}/deals`} />
      <Route exact path={`${url}/deals`} component={Deals} />
      <Route exact path={`${url}/deals/:id`} component={Deal} />
      <Route exact path={`${url}/wallet`} component={Wallet} />
      <Route exact path={`${url}/create-deal`} component={CreateDeal} />
      <Redirect from="*" to="/404" />
    </Switch>
  )
}

export default Dashboard
