import React from "react"
import useIsLoggedIn from "../customHooks/useIsLoggedIn"
import { Redirect, Route } from "react-router-dom"
import { useSelector } from "react-redux"
import LoginPage from "../components/LoginPage"

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const [loading] = useIsLoggedIn()
  const userId = useSelector(({ auth }) => auth)

  console.log(rest.path, "in private route")

  return (
    <Route
      {...rest}
      component={(props) =>
        loading ? (
          "Loading..."
        ) : userId ? (
          <Component {...props} />
        ) : (
          <LoginPage />
        )
      }
    />
  )
}

export default PrivateRoute
