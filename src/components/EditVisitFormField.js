import React, { useContext, useState, useEffect } from "react"
import MaterialUIPickers from "./DatePicker"
import EditVisitContext from "../contexts/editVisitContext"
import { TextField } from "@material-ui/core"
import Checklist from "./Checklist"
import EditVisitDiseases from "./EditVisitDiseases"

export const EditVisitFormField = ({ field }) => {
  const editContext = useContext(EditVisitContext)
  const [checkedItems, setCheckedItems] = useState([])

  useEffect(() => {
    if (editContext.visitState[field.fieldId]) {
      setCheckedItems(editContext.visitState[field.fieldId])
    }
  }, [editContext.visitState[field.fieldId]])

  const setFieldValue = (value) => {
    editContext.updateValue(field.fieldId, value)
  }

  const handleChecklistState = (e) => {
    let stateValue = editContext.visitState[field.fieldId]

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

    editContext.updateValue(field.fieldId, newStateValue)
  }

  console.log(
    editContext.visitState[field.fieldId],
    "editContext.visitState[field.fieldId]",
    "in EditiVisitFormField"
  )

  return (
    <div>
      {field.valueType == "string" && (
        <TextField
          label={field.label.capitalize()}
          // value={fieldValue}
          value={editContext.visitState[field.fieldId]}
          variant="filled"
          size="small"
          onChange={(e) => {
            // editContext.updateValue(field.fieldId, e.target.value)
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
          selectedDate={editContext.visitState[field.fieldId]}
          setSelectedDate={setFieldValue}
          pickerId={field.label}
        />
      )}
      {field.valueType == "checklist" && (
        <Checklist
          handleChecklistState={handleChecklistState}
          checkedItems={checkedItems}
          checklistItems={field.checklistItems}
          label={field.label}
        />
      )}
    </div>
  )
}

export default EditVisitFormField
