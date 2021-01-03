import React, {Fragment} from "react"
import useIsLoggedIn from "../customHooks/useIsLoggedIn"
import { Redirect, Route } from "react-router-dom"
import { useSelector } from "react-redux"
import LoginPage from "../pages/LoginPage"
import CssBaseline from "@material-ui/core/CssBaseline"
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles"
import { theme } from "../materialUI/theme"

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
          <Fragment>
          <CssBaseline />
            <MuiThemeProvider theme={theme}>
                <LoginPage />
            </MuiThemeProvider>
          </ Fragment>
        )
      }
    />
  )
}

export default PrivateRoute
