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
  const fieldId = useSelector(({ ids }) => ids.fieldId)
  // const fieldsOrder = useSelector(({ fieldsOrder }) => fieldsOrder)
  const visitFormFields = useSelector(({ visitFields, fieldsOrder }) => {
    console.log(fieldsOrder, "fieldsOrder in addvisitfomr!")

    console.log(visitFields, "visitFields before")
    visitFields.sort(
      (field1, field2) =>
        fieldsOrder[field1.fieldId] - fieldsOrder[field2.fieldId]
    )
    console.log(visitFields, "visitFields after")

    return visitFields
  })
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
    if (process.env.NODE_ENV === "development") {
      // console.log(visitFieldsIds, visitState, "visitState")
    }
  }, [visitState])

  const updateValue = (key, val) => {
    setVisitState({ ...visitState, [key]: val })
  }

  const verifyStateRequirements = () => {
    // VERIFICAR SE OS REQUERIMENTOS SÃO ATENDIDOS
    let errorMessage = ""
    visitFormFields.forEach((field) => {
      if (field.required && visitState[field.fieldId] === "") {
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

    let upperCasedEntries = Object.entries(visitObj).map(([key, value]) => {
      if (value instanceof String) {
        return [key, value.toUpperCase()]
      }
      return [key, value]
    })

    visitObj = {}
    upperCasedEntries.forEach(([key, value]) => {
      visitObj[key] = value
    })

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
