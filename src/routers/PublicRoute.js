import React from "react"
import { Redirect } from "react-router-dom"
import useIsLoggedIn from "../customHooks/useIsLoggedIn"
import { useSelector } from "react-redux"

export const PublicRoute = ({ component: Component, ...rest }) => {
  // const [isLoggedIn, setIsLoggedIn, loading] = useIsLoggedIn()
  const [loading] = useIsLoggedIn()
  const userId = useSelector(({ auth }) => auth)

  return (
    <div>
      {loading === true ? (
        "Loading..."
      ) : userId ? (
        <Redirect to="/" />
      ) : (
        <Component {...rest} />
      )}
    </div>
  )
}

export default PublicRoute
