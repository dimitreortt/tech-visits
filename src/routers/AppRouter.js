import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import VisitsApp from "../components/VisitsApp"
import PrivateRoute from "./PrivateRoute"
import NotFoundPage from "../pages/NotFoundPage"

export const AppRouter = (props) => {
  console.log("to no app routers")
  return (
    <Router>
      <Switch>
        <PrivateRoute path="/visitas-tecnicas-geagrotech/:fieldId" component={VisitsApp} />
        {/* <Route path="/coopasvtech/:fieldId" component={VisitsApp} /> */}
        <Route component={NotFoundPage} />
      </Switch>
    </Router>
  )
}

export default AppRouter
