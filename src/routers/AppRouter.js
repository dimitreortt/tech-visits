import React from "react"
import { BrowserRouter as Router, Switch } from "react-router-dom"
import FieldNotesApp from "../components/FieldNotesApp"
import LoginPage from "../components/LoginPage"
import PublicRoute from "./PublicRoute"
import PrivateRoute from "./PrivateRoute"

export const AppRouter = (props) => {
  return (
    <Router>
      <Switch>
        <PublicRoute path="/login" component={LoginPage} />
        <PrivateRoute path="/" component={FieldNotesApp} exact />
      </Switch>
    </Router>
  )
}

export default AppRouter
