import React, { useState, useEffect } from "react"
import "react-datepicker/dist/react-datepicker.css"
import { useDispatch, useSelector } from "react-redux"
import { VisitFormField } from "./VisitFormField"
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
    // textAlign: "center",
    // color: theme.palette.text.secondary,
  },
}))

export const VisitForm = (props) => {
  const dispatch = useDispatch()
  const fieldId = useSelector(({ fieldId }) => fieldId)
  const visitFields = useSelector(({ visitFields }) => {
    console.log(props.editVisitMode, "in edit vi mode")

    return !!props.editVisitMode
      ? visitFields.filter((field) => {
          let contains = false
          props.entries.forEach(([key, value]) => {
            if (key === field.fieldId) {
              contains = true
            }
          })
          return contains
        })
      : visitFields
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

  const setEditVisitState = () => {
    let newState = {}
    props.entries.forEach(([key, value]) => {
      newState[key] = value
    })
    console.log(newState, "in set edit")
    setVisitState(newState)
  }

  useEffect(async () => {
    while (!visitFields) {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log("in wait visitFields")
    }

    if (props.editVisitMode) {
      console.log(visitFields, "in edit tralala")
      setEditVisitState()
    } else {
      resetVisitState()
    }
  }, [])

  useEffect(() => {
    console.log(visitFieldsIds, visitState, "visitState")
  }, [visitState])

  const updateValue = (key, val) => {
    setVisitState({ ...visitState, [key]: val })
  }

  const verifyStateRequirements = () => {
    // VERIFICAR SE OS REQUERIMENTOS SÃO ATENDIDOS
    let errorMessage = ""
    visitFields.forEach((field) => {
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
        {visitFields.map((field, index) => (
          <VisitFormField field={field} key={index} />
        ))}
        <SubmitButton onClick={addVisit} />
      </VisitFormContext.Provider>
    </Paper>
  )
}

export default VisitForm
