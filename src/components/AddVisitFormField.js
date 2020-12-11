import React, { useState, useContext, useEffect } from "react"
import DatePicker from "react-datepicker"
import AddVisitContext from "../contexts/addVisitContext"

export const AddVisitFormField = ({ field }) => {
  const [fieldValue, setFieldValue] = useState("")
  const visitContext = useContext(AddVisitContext)

  useEffect(() => {
    visitContext.updateValue(field.fieldId, fieldValue)
  }, [fieldValue])

  // useEffect(() => {
  //   return () => {
  //     console.log("toasdasdoiaaqy aquiii")
  //     setFieldValue("")
  //   }
  // }, [])

  const onFormSubmit = (e) => {
    e.preventDefault()

    console.log(fieldValue)
    console.log(e.target)

    let i = 0
    while (e.target[i]) {
      if (e.target[i].checked) {
        console.log(e.target[i].value)
      }
      i++
    }

    // props.addField(fieldName, fieldValue)
  }

  const fieldIdState = () => {
    return visitContext.visitState[field.fieldId]
  }

  const handleCheckListState = (e) => {
    let stateValue = fieldIdState()
    // if (stateValue instanceof Array) {
    //   visitContext.updateValue(field.fieldId, e.target.value)
    // }

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
      <div>
        {Object.entries(field).map((ent, index) => (
          <div key={index}>
            {ent[0]} {ent[1]}
          </div>
        ))}
        <div></div>
      </div>
      <form onSubmit={onFormSubmit}>
        <label htmlFor="value">
          <strong>{field.label}</strong>
        </label>
        {field.valueType == "string" && (
          <input
            id="value"
            type="text"
            value={fieldValue}
            placeholder="Enter field value"
            onChange={(e) => {
              // visitContext.updateValue(field.fieldId, e.target.value)
              setFieldValue(e.target.value)
            }}
          ></input>
        )}
        {field.valueType == "date" && (
          <>
            {/* <label htmlFor="value">Field Name:</label> */}
            <DatePicker
              selected={fieldValue}
              // onChange={(date) => visitContext.updateValue(field.fieldId, date)}
              onChange={(date) => setFieldValue(date)}
              id="value"
            />
          </>
        )}
        {field.valueType == "checklist" &&
          field.checklistItems.map((item, index) => (
            <React.Fragment key={index}>
              <input
                onChange={handleCheckListState}
                type="checkbox"
                id={index}
                name={item}
                value={item}
              ></input>
              <label htmlFor={index}> {item}</label>
            </React.Fragment>
          ))}

        {/* <button type="submit">Save</button> */}
      </form>
    </div>
  )
}

export default AddVisitFormField

// {Object.entries(field).map((ent, index) => (
//   <div key={index}>
//     {ent[0]} {ent[1]}
//   </div>
// ))}
