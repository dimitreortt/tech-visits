import React, { useState } from "react"
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
  const [valueType, setValueType] = useState("Texto")
  const [checklistItems, setChecklistItems] = useState([])
  const [showAddChecklistItemField, setShowAddChecklistItemField] = useState(
    false
  )
  const dispatch = useDispatch()

  const translateValueType = () => {
    let value
    if (valueType === "Texto") {
      value = "string"
    } else if (valueType === "Data") {
      value = "date"
    } else if (valueType === "Lista") {
      value = "checklist"
    }
    return value
  }

  const onFormSubmit = (e) => {
    e.preventDefault()

    console.log(fieldLabel, fieldValue)

    if (!fieldLabel) {
      return alert("Nome do campo não pode ser vazio!")
    }

    if (fieldsLabels.includes(fieldLabel)) {
      return alert("Um campo com este nome já existe!")
    }
    let translatedValueType = translateValueType()
    let options = {}
    if (translatedValueType === "checklist") {
      options.checklistItems = checklistItems
    }

    addField(fieldLabel, translatedValueType, dispatch, options)
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
        typeOptions={["Texto", "Data", "Lista"]}
        valueType={valueType}
        setValueType={setValueType}
      />
      <div>
        <TextField
          variant="filled"
          label={"Nome do Campo"}
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
      {valueType === "text" && (
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
      {valueType === "Lista" && (
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
                label={"Nome do Item"}
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
                Salvar Item
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
            {!showAddChecklistItemField ? "Adicionar Item" : <CancelIcon />}
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
