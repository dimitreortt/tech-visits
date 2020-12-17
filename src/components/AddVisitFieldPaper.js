import React, { useState } from "react"
import DatePicker from "react-datepicker"
import { useSelector, useDispatch } from "react-redux"
import addField from "../db/addField"
import ValueTypeSelect from "./ValueTypeSelect"
import { TextField, Button } from "@material-ui/core"
import CancelIcon from "@material-ui/icons/Cancel"
import { SubmitButton } from "./SubmitButton"

export const AddVisitFieldPaper = (props) => {
  const fieldsLabels = useSelector(({ visitFields }) =>
    visitFields.map((field) => field.label)
  )
  const [fieldLabel, setFieldLabel] = useState("")
  const [fieldValue, setFieldValue] = useState("")
  const [newChecklistItemName, setNewChecklistItemName] = useState("")
  const [valueType, setValueType] = useState("string")
  const [checklistItems, setChecklistItems] = useState([])
  const [showAddChecklistItemField, setShowAddChecklistItemField] = useState(
    false
  )
  const dispatch = useDispatch()

  const onFormSubmit = (e) => {
    e.preventDefault()

    console.log(fieldLabel, fieldValue)

    if (!fieldLabel) {
      return alert("Field label can't be empty!")
    }

    if (fieldsLabels.includes(fieldLabel)) {
      return alert("This field already exists!")
    }

    let options = {}
    if (valueType === "checklist") {
      options.checklistItems = checklistItems
    }

    addField(fieldLabel, valueType, dispatch, options)
    props.toggleInAddFieldMode()
  }

  const addCheckListItem = () => {
    if (checklistItems.includes(newChecklistItemName)) {
      alert("Item already included")
      return
    }
    setChecklistItems(checklistItems.concat([newChecklistItemName]))
    setNewChecklistItemName("")
    setShowAddChecklistItemField(!showAddChecklistItemField)
  }

  return (
    <form onSubmit={onFormSubmit}>
      <ValueTypeSelect
        typeOptions={["string", "date", "checklist"]}
        valueType={valueType}
        setValueType={setValueType}
      />
      <div>
        <TextField
          variant="filled"
          label={"Field Name"}
          fullWidth
          value={fieldLabel}
          onChange={(e) => {
            // visitContext.updateValue(field.fieldId, e.target.value)
            setFieldLabel(e.target.value)
          }}
          inputProps={{
            style: { textTransform: "capitalize" },
          }}
        />
      </div>
      {valueType == "text" && (
        <div>
          <label htmlFor="value">Field Value:</label>
          <input
            id="value"
            type="text"
            value={fieldValue}
            placeholder="Enter field value"
            onChange={(e) => {
              setFieldValue(e.target.value)
            }}
          ></input>
        </div>
      )}
      {valueType == "checklist" && (
        <>
          {checklistItems.map((item, index) => (
            <div key={index}>
              <input
                type="checkbox"
                id={index}
                name={item}
                value={item}
              ></input>
              <label htmlFor={index}> {item}</label>
            </div>
          ))}
          {showAddChecklistItemField && (
            <>
              <TextField
                variant="filled"
                label={"Checklist Item Name"}
                // fullWidth
                size={"small"}
                value={newChecklistItemName}
                onChange={(e) => {
                  // visitContext.updateValue(field.fieldId, e.target.value)
                  setNewChecklistItemName(e.target.value)
                }}
                inputProps={{
                  style: { textTransform: "capitalize" },
                }}
              />
              <Button
                variant="outlined"
                color="primary"
                size="small"
                onClick={addCheckListItem}
              >
                Save Item
              </Button>
            </>
          )}
          <Button
            variant="outlined"
            color={showAddChecklistItemField ? "secondary" : "primary"}
            size="small"
            onClick={() =>
              setShowAddChecklistItemField(!showAddChecklistItemField)
            }
          >
            {!showAddChecklistItemField ? "Add Item" : <CancelIcon />}
          </Button>
        </>
      )}
      <div>
        <SubmitButton />
      </div>
    </form>
  )
}

export default AddVisitFieldPaper
