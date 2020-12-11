import React, { useState, useEffect } from "react"
import DatePicker from "react-datepicker"

export const VisitField = ({
  fieldLabel,
  fieldValue,
  editField,
  editable,
  fieldValueType,
}) => {
  const [inEditFieldMode, setInEditFieldMode] = useState(false)
  const [keyInput, setKeyInput] = useState("")
  const [valueInput, setValueInput] = useState("")
  const [isDateValue, setIsDateValue] = useState(null)

  console.log(isDateValue, fieldValue, fieldValueType, "in Visit Field")

  useEffect(() => {
    if (fieldValue instanceof Date) {
      setIsDateValue(true)
    } else {
      setIsDateValue(false)
    }
    setKeyInput(fieldLabel)
    setValueInput(fieldValue)
  }, [])

  const toggleInEditFieldMode = () => {
    setInEditFieldMode(!inEditFieldMode)
  }

  const onFormSubmit = (e) => {
    e.preventDefault()

    if (!keyInput) {
      alert("Field name cannot be empty!")
      return
    }

    editField(fieldLabel, keyInput, valueInput)
    toggleInEditFieldMode()
  }

  return (
    <div>
      <div>
        <strong>{fieldLabel}: </strong>
        <span>
          {fieldValueType == "date" && fieldValue.toLocaleDateString()}
          {fieldValueType == "string" && fieldValue}
          {fieldValueType == "checklist" &&
            !!fieldValue &&
            fieldValue.map((value, index) => (
              <React.Fragment key={index}>
                <div>
                  <input
                    type="checkbox"
                    id={index}
                    name={value}
                    value={value}
                    checked
                    disabled
                  ></input>
                  <label htmlFor={index}> {value}</label>
                </div>
              </React.Fragment>
            ))}
        </span>
        {inEditFieldMode && (
          <div>
            <form onSubmit={onFormSubmit}>
              <input
                type="text"
                value={keyInput}
                onChange={(e) => setKeyInput(e.target.value)}
              ></input>
              {!isDateValue ? (
                <input
                  type="text"
                  value={valueInput}
                  onChange={(e) => setValueInput(e.target.value)}
                ></input>
              ) : (
                <DatePicker
                  selected={valueInput}
                  onChange={(date) => setValueInput(date)}
                  id="dateInput"
                />
              )}
              <button type="submit">Save</button>
            </form>
          </div>
        )}
        {editable && (
          <button onClick={() => toggleInEditFieldMode()}>Edit Field</button>
        )}
      </div>
    </div>
  )
}

export default VisitField
