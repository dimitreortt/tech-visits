import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import downloadVisits from "../db/downloadVisits"
import downloadFieldsContents from "../db/downloadFieldsContents"
import CssBaseline from "@material-ui/core/CssBaseline"
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles"
import { theme } from "../materialUI/theme"
import { HomePage } from "../pages/HomePage"

export const VisitsApp = () => {
  const dispatch = useDispatch()
  const fieldId = useSelector(({ fieldId }) => fieldId)
  const params = useParams()

  useEffect(() => {
    if (fieldId) {
      downloadVisits(fieldId, dispatch)
      downloadFieldsContents(dispatch)
    }
  }, [fieldId])

  useEffect(() => {
    dispatch({ type: "SET_FIELD_ID", fieldId: params.fieldId })
  }, [])

  return (
    <React.Fragment>
      <CssBaseline />
      <MuiThemeProvider theme={theme}>
        <HomePage />
      </MuiThemeProvider>
    </React.Fragment>
  )
}

export default VisitsApp
