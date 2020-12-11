import React, { useEffect, useState } from "react"
import AddVisitForm from "./AddVisitForm"
import { useSelector, useDispatch } from "react-redux"
import VisitsList from "./VisitsList"
import LogoutButton from "./LogoutButton"
import AddVisitButton from "./AddVisitButton"
import { useParams } from "react-router-dom"
import downloadVisits from "../db/downloadVisits"
import downloadFieldsContents from "../db/downloadFieldsContents"
import selectFieldsFromRawVisit from "../selectors/selectFieldsFromRawVisit"
import CssBaseline from "@material-ui/core/CssBaseline"
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles"
import { theme } from "../materialUI/theme"

export const FieldNotesApp = () => {
  const dispatch = useDispatch()
  const listSize = useSelector(({ visits }) => (visits ? visits.length : 0))
  const [showForm, setShowForm] = useState(false)
  const fieldId = useSelector(({ fieldId }) => fieldId)
  const params = useParams()
  // const fields = selectFieldsFromRawVisit()
  const visits = useSelector(({ visits }) => visits)

  console.log(visits, "in visitsApp")

  useEffect(() => {
    if (fieldId) {
      downloadVisits(fieldId, dispatch)
      downloadFieldsContents(dispatch)
    }
  }, [fieldId])

  useEffect(() => {
    dispatch({ type: "SET_FIELD_ID", fieldId: params.fieldId })
  }, [])

  const toggleShowForm = () => {
    setShowForm(!showForm)
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <MuiThemeProvider theme={theme}>
        <AddVisitButton toggleShowForm={toggleShowForm} />
        {showForm && <AddVisitForm toggleShowForm={toggleShowForm} />}
        <VisitsList />
        <LogoutButton />
      </MuiThemeProvider>
    </React.Fragment>
  )
}

export default FieldNotesApp
