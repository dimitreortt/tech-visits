import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import downloadVisits from "../db/downloadVisits"
import downloadFieldsContents from "../db/downloadFieldsContents"
import downloadFarmAndGrowerInfo from "../db/downloadFarmAndGrowerInfo"
import downloadFieldsOrder from "../db/donwloadFieldsOrder"
import CssBaseline from "@material-ui/core/CssBaseline"
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles"
import { theme } from "../materialUI/theme"
import { HomePage } from "../pages/HomePage"

export const VisitsApp = () => {
  const dispatch = useDispatch()
  const fieldId = useSelector(({ ids }) => ids.fieldId)
  const params = useParams()

  useEffect(() => {
    if (fieldId) {
      downloadFarmAndGrowerInfo(fieldId, dispatch)
      downloadVisits(fieldId, dispatch)
      downloadFieldsContents(dispatch)
      downloadFieldsOrder(dispatch)
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
