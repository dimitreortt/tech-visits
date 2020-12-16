import React, { useState, useEffect } from "react"
import "react-datepicker/dist/react-datepicker.css"
import { useDispatch, useSelector } from "react-redux"
import { AddVisitFormField } from "./AddVisitFormField"
import VisitFormContext from "../contexts/visitContext"
import db from "../firebase/firebase"
import { Paper, makeStyles } from "@material-ui/core"
import { SubmitButton } from "./SubmitButton"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
  },
}))

export const AddVisitForm = (props) => {
  const dispatch = useDispatch()
  const fieldId = useSelector(({ fieldId }) => fieldId)
  const visitFormFields = useSelector(({ visitFields }) => visitFields)
  const [visitState, setVisitState] = useState()
  const visitFieldsIds = useSelector(({ visitFields }) =>
    visitFields.map((visitField) => visitField.fieldId)
  )
  const classes = useStyles()

  const mapFieldsIdsToStateObject = (ids) => {
    let stateObj = {}
    ids.forEach((id) => {
      stateObj[id] = ""
    })
    return stateObj
  }

  const resetVisitState = () => {
    setVisitState(mapFieldsIdsToStateObject(visitFieldsIds))
  }

  useEffect(() => {
    resetVisitState()
  }, [visitFormFields])

  useEffect(() => {
    console.log(visitFieldsIds, visitState, "visitState")
  }, [visitState])

  const updateValue = (key, val) => {
    setVisitState({ ...visitState, [key]: val })
  }

  const verifyStateRequirements = () => {
    // VERIFICAR SE OS REQUERIMENTOS SÃO ATENDIDOS
    let errorMessage = ""
    visitFormFields.forEach((field) => {
      if (field.required && visitState[field.fieldId] == "") {
        errorMessage += "Field " + field.label + " is required!\n"
      }
    })
    if (errorMessage) {
      alert(errorMessage)
      return false
    }
    return true
  }

  const addVisit = () => {
    console.log("to aqui de aqui")
    if (!verifyStateRequirements()) {
      console.log("Unable to add visit!")
      return
    }

    let visitObj = { ...visitState, fieldId }
    db.collection("visits")
      .add(visitObj)
      .then((docRef) => {
        dispatch({
          type: "ADD_VISIT",
          visit: { ...visitObj, visitId: docRef.id },
        })
      })
      .catch((e) => console.log(e))

    props.toggleShowForm()
  }

  return (
    <Paper className={classes.paper}>
      <VisitFormContext.Provider value={{ visitState, updateValue }}>
        {!!visitState &&
          visitFormFields.map((field, index) => (
            <AddVisitFormField field={field} key={index} />
          ))}
        <SubmitButton onClick={addVisit} />
      </VisitFormContext.Provider>
    </Paper>
  )
}

export default AddVisitForm
