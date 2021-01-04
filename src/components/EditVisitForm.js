import React, { useState, useEffect } from "react"
import "react-datepicker/dist/react-datepicker.css"
import { Paper, makeStyles } from "@material-ui/core"
import { SubmitButton } from "./SubmitButton"
import EditVisitContext from "../contexts/editVisitContext"
import EditVisitFormField from "./EditVisitFormField"
import { useDispatch } from "react-redux"
import updateVisit from "../db/updateVisit"
import AlertDialog from "./UpdateEditFormDialog"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
  },
}))

export const EditVisitForm = (props) => {
  const classes = useStyles()
  const [visitState, setVisitState] = useState()
  const [shouldUpdate, setShouldUpdate] = useState()
  const [visitFields, setVisitFields] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    let newState = {}
    let fields = []
    props.entries.forEach(([key, value]) => {
      newState[key] = value

      let field = {
        ...props.visitFormFields.find((field) => field.fieldId === key),
      }

      if (field.valueType === "checklist") {
        field.checklistItems = value
      }

      fields.push(field)
    })

    console.log(fields, newState, "in edit visit form newstate")
    setVisitState(newState)
    setVisitFields(fields)
  }, [])

  useEffect(() => {
    if (shouldUpdate) {
      console.log("should")
      let fieldsToBeAdded = props.visitFormFields.filter((formField) =>
        visitFields.every(
          (visitField) => visitField.fieldId !== formField.fieldId
        )
      )

      // PERCORRER AS DUAS ARRAYS
      let newVisitFields = visitFields.map((visitField) => {
        if (visitField.valueType === "checklist") {
          return props.visitFormFields.find(
            (formField) => formField.fieldId === visitField.fieldId
          )
        }
        return visitField
      })

      console.log(fieldsToBeAdded, "fieldsToBeAdded")
      console.log(newVisitFields, "newVisitFields")
      setVisitFields(newVisitFields.concat(fieldsToBeAdded))
    } else {
      console.log("shouldnt")
    }
  }, [shouldUpdate])

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.log(visitFields, visitState, "visitState edit visit")
    }
  }, [visitState])

  const updateValue = (key, val) => {
    setVisitState({ ...visitState, [key]: val })
  }

  const onSubmit = () => {
    updateVisit(visitState, props.visitId, dispatch)
    props.toggleInEditMode()
  }

  return (
    <>
      <Paper className={classes.paper}>
        <EditVisitContext.Provider value={{ visitState, updateValue }}>
          {visitFields.map((field, index) => (
            <EditVisitFormField field={field} key={index} />
          ))}
          <SubmitButton onClick={onSubmit} />
        </EditVisitContext.Provider>
      </Paper>
      <AlertDialog setShouldUpdate={setShouldUpdate} />
    </>
  )
}

export default EditVisitForm
