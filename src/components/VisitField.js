import React, { useState, useEffect } from "react"
import DatePicker from "react-datepicker"

export const VisitField = ({ fieldKey, fieldValue, editField }) => {
  const [inEditFieldMode, setInEditFieldMode] = useState(false)
  const [keyInput, setKeyInput] = useState("")
  const [valueInput, setValueInput] = useState("")
  const [isDateValue, setIsDateValue] = useState(null)

  useEffect(() => {
    setKeyInput(fieldKey)
    setValueInput(fieldValue)
    if (fieldValue instanceof Date) {
      setIsDateValue(true)
    } else {
      setIsDateValue(false)
    }
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

    editField(fieldKey, keyInput, valueInput)
    toggleInEditFieldMode()
  }

  return (
    <div>
      <div>
        <strong>{fieldKey}: </strong>
        <span>
          {isDateValue != null &&
            (isDateValue ? fieldValue.toLocaleDateString() : fieldValue)}{" "}
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
        <button onClick={() => toggleInEditFieldMode()}>Edit Field</button>
      </div>
    </div>
  )
}

export default VisitField
