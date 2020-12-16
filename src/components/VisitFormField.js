import React, { useState, useContext, useEffect } from "react"
import VisitContext from "../contexts/visitContext"
import { TextField } from "@material-ui/core"
import MaterialUIPickers from "./DatePicker"
import Checklist from "./Checklist"
import { AddVisitDiseases } from "./AddVisitDiseases"

export const VisitFormField = ({ field }) => {
  const [fieldValue, setFieldValue] = useState(undefined)
  const visitContext = useContext(VisitContext)

  // useEffect(() => {
  //   if (fieldValue != undefined) {
  //     visitContext.updateValue(field.fieldId, fieldValue)
  //     console.log("!= undefined")
  //   }
  //   console.log("fora undefined")
  // }, [fieldValue])

  // useEffect(async () => {
  //   while (!visitContext.visitState) {
  //     await new Promise((resolve) => setTimeout(resolve, 1000))
  //     console.log(visitContext.visitState, "in wait field value")
  //   }

  //   let newFieldValue = visitContext.visitState[field.fieldId]
  //   console.log(newFieldValue, "field Value")
  //   setFieldValue(newFieldValue)
  // }, [])

  const fieldIdState = () => {
    if (visitContext.visitState) {
      return visitContext.visitState[field.fieldId]
    }
  }

  const handleChecklistState = (e) => {
    let stateValue = fieldIdState()

    let newStateValue
    if (e.target.checked) {
      console.log(e.target.value, "has been checked")
      newStateValue =
        stateValue instanceof Array
          ? stateValue.concat([e.target.value])
          : [e.target.value]
    } else {
      console.log(e.target.value, "has been unchecked")
      newStateValue = stateValue.filter((item) => item != e.target.value)
    }

    visitContext.updateValue(field.fieldId, newStateValue)
  }

  return (
    <div>
      {field.valueType == "string" && (
        <TextField
          label={field.label.capitalize()}
          // value={fieldValue}
          value={fieldIdState()}
          variant="filled"
          size="small"
          onChange={(e) => {
            // visitContext.updateValue(field.fieldId, e.target.value)
            setFieldValue(e.target.value)
          }}
          inputProps={{
            style: { textTransform: "capitalize" },
          }}
        />
      )}
      {field.valueType == "date" && (
        <MaterialUIPickers
          label={field.label.capitalize()}
          // selectedDate={fieldValue}
          selectedDate={fieldIdState()}
          setSelectedDate={setFieldValue}
          pickerId={field.label}
        />
      )}
      {field.valueType == "checklist" &&
        (field.label === "diseases" ? (
          <AddVisitDiseases
            handleChecklistState={handleChecklistState}
            checklistItems={field.checklistItems}
          />
        ) : (
          <Checklist
            handleChecklistState={handleChecklistState}
            checklistItems={field.checklistItems}
            label={field.label}
          />
        ))}
    </div>
  )
}

export default VisitFormField
