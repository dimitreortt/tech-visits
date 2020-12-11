import React, { useState } from "react"
import DatePicker from "react-datepicker"

export const AddVisitFieldPaper = (props) => {
  const [fieldName, setFieldName] = useState("")
  const [fieldValue, setFieldValue] = useState("")
  const [newCheckListItemName, setNewCheckListItemName] = useState("")
  const [valueType, setValueType] = useState("text")
  const [checkListItems, setCheckListItems] = useState([])
  const [showAddChecklistItemField, setShowAddChecklistItemField] = useState(
    false
  )

  const onTypeChange = (e) => {
    console.log(e.target.value, "lasdasdasdojn")
    if (e.target.value == "date") {
      setFieldValue(Date.now())
    } else if (e.target.value == "text") {
      setFieldValue("")
    } else if (e.target.value == "checklist") {
      setFieldValue([])
    }
    setValueType(e.target.value)
  }

  const onFormSubmit = (e) => {
    e.preventDefault()

    console.log("to submetendooooooo")

    console.log(fieldName, fieldValue)
    props.addField(fieldName, fieldValue)
  }

  const addCheckListItem = () => {
    if (checkListItems.includes(newCheckListItemName)) {
      alert("Item already included")
      return
    }
    setCheckListItems(checkListItems.concat([newCheckListItemName]))
    setNewCheckListItemName("")
    setShowAddChecklistItemField(!showAddChecklistItemField)
  }

  return (
    <form onSubmit={onFormSubmit}>
      <div>
        <label htmlFor="types">Value type:</label>
        <select
          name="types"
          id="types"
          onChange={onTypeChange}
          value={valueType}
        >
          <option value="text">Text</option>
          <option value="date">Date</option>
          <option value="checklist">Checklist</option>
        </select>
      </div>
      <div>
        <label htmlFor="name">Field Name:</label>
        <input
          id="name"
          type="text"
          value={fieldName}
          placeholder="Enter field name"
          onChange={(e) => {
            setFieldName(e.target.value)
          }}
        ></input>
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
      {valueType == "date" && (
        <>
          <label htmlFor="dateInput">Field Name:</label>
          <DatePicker
            selected={fieldValue}
            onChange={(date) => setFieldValue(date)}
            id="dateInput"
          />
        </>
      )}
      {valueType == "checklist" && (
        <>
          {checkListItems.map((item, index) => (
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
            <div>
              <label htmlFor="value">Item Name:</label>
              <input
                id="value"
                type="text"
                value={newCheckListItemName}
                placeholder="Enter item name"
                onChange={(e) => {
                  setNewCheckListItemName(e.target.value)
                }}
              ></input>
              <button type="button" onClick={addCheckListItem}>
                Save
              </button>
            </div>
          )}
          <button
            type="button"
            onClick={() =>
              setShowAddChecklistItemField(!showAddChecklistItemField)
            }
          >
            Add Item
          </button>
        </>
      )}
      <button type="submit">Save</button>
    </form>
  )
}

export default AddVisitFieldPaper
