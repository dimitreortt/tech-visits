import React from "react"
import useIsLoggedIn from "../customHooks/useIsLoggedIn"
import { Redirect, Route } from "react-router-dom"
import { useSelector } from "react-redux"

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const [loading] = useIsLoggedIn()
  const userId = useSelector(({ auth }) => auth)

  return (
    <Route
      {...rest}
      component={(props) =>
        loading ? (
          "Loading..."
        ) : userId ? (
          <div>
            <Component {...props} />
          </div>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  )
}

export default PrivateRoute
