import React from 'react'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'
import { Route, RouteComponentProps, useHistory } from 'react-router-dom'

import useAuth from 'context/Auth'

interface IProps {
  readonly path?: string
  component: React.ComponentType<RouteComponentProps>
}

const PrivateRoute: React.FC<IProps> = ({
  component: Component,
  ...rest
}): JSX.Element => {
  const { isAuthenticated, session } = useAuth()
  const history = useHistory()

  React.useEffect(() => {
    if (!session) {
      history.push('/auth/logout')
    }
  }, [session, history])

  return (
    <Route
      {...rest}
      render={(props: RouteComponentProps) => {
        if (!isEmpty(isAuthenticated())) {
          return <Component {...props} />
        } else {
          props.history.replace('/auth/login')
          return null
        }
      }}
    />
  )
}

PrivateRoute.propTypes = {
  component: PropTypes.any.isRequired
}

export default PrivateRoute
