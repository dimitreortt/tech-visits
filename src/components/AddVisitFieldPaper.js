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

  const onTypeChange = (e) => {
    console.log(e.target.value, "lasdasdasdojn")
    if (e.target.value == "date") {
      setFieldValue(Date.now())
    } else if (e.target.value == "string") {
      setFieldValue("")
    } else if (e.target.value == "checklist") {
      setFieldValue([])
    }
    setValueType(e.target.value)
  }

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
      {/* {valueType == "date" && (
        <>
          <label htmlFor="dateInput">Field Name:</label>
          <DatePicker
            selected={fieldValue}
            onChange={(date) => setFieldValue(date)}
            id="dateInput"
          />
        </>
      )} */}
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
              {/* <label htmlFor="value">Item Name:</label>
              <input
                id="value"
                type="text"
                value={newChecklistItemName}
                placeholder="Enter item name"
                onChange={(e) => {
                  setNewChecklistItemName(e.target.value)
                }}
              ></input> */}
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
              {/* <button type="button" onClick={addCheckListItem}>
                Save
              </button> */}
              <Button
                variant="outlined"
                // variant="contained"
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
            // fullWidth
          >
            {!showAddChecklistItemField ? "Add Item" : <CancelIcon />}
          </Button>
        </>
      )}
      {/* <button type="submit">Save</button> */}
      <div>
        <SubmitButton />
      </div>
    </form>
  )
}

export default AddVisitFieldPaper
