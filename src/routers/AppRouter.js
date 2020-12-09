import React from "react"
import { BrowserRouter as Router, Switch } from "react-router-dom"
import VisitsApp from "../components/VisitsApp"
import PrivateRoute from "./PrivateRoute"

export const AppRouter = (props) => {
  return (
    <Router>
      <Switch>
        <PrivateRoute path="/:fieldId" component={VisitsApp} exact />
      </Switch>
    </Router>
  )
}

export default AppRouter
