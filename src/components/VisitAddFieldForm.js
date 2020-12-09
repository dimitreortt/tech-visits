import React, { useState } from "react"
import DatePicker from "react-datepicker"

export const VisitAddFieldForm = (props) => {
  const [fieldName, setFieldName] = useState("")
  const [fieldValue, setFieldValue] = useState("")
  const [valueType, setValueType] = useState("text")

  const onTypeChange = (e) => {
    console.log(e.target.value, "lasdasdasdojn")
    if (e.target.value == "date") {
      setFieldValue(Date.now())
    } else if (e.target.value == "text") {
      setFieldValue("")
    }
    setValueType(e.target.value)
  }

  const onFormSubmit = (e) => {
    e.preventDefault()

    console.log(fieldName, fieldValue)
    props.addField(fieldName, fieldValue)
  }

  return (
    <form onSubmit={onFormSubmit}>
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
        </select>
      </div>
      {valueType == "text" ? (
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
      ) : valueType == "date" ? (
        <>
          <label htmlFor="dateInput">Field Name:</label>
          <DatePicker
            selected={fieldValue}
            onChange={(date) => setFieldValue(date)}
            id="dateInput"
          />
        </>
      ) : (
        ""
      )}
      <button type="submit">Save</button>
    </form>
  )
}

export default VisitAddFieldForm
