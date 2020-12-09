import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import VisitsApp from "../components/VisitsApp"
import PrivateRoute from "./PrivateRoute"
import NotFoundPage from "../components/NotFoundPage"

export const AppRouter = (props) => {
  return (
    <Router>
      <Switch>
        <PrivateRoute path="/:fieldId" component={VisitsApp} exact />
        <Route component={NotFoundPage} />
      </Switch>
    </Router>
  )
}

export default AppRouter
