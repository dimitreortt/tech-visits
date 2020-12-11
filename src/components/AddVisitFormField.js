import React, { useState, useContext, useEffect } from "react"
import DatePicker from "react-datepicker"
import AddVisitContext from "../contexts/addVisitContext"
import {
  Checkbox,
  FormGroup,
  FormControlLabel,
  TextField,
} from "@material-ui/core"

export const AddVisitFormField = ({ field }) => {
  const [fieldValue, setFieldValue] = useState("")
  const visitContext = useContext(AddVisitContext)

  useEffect(() => {
    visitContext.updateValue(field.fieldId, fieldValue)
  }, [fieldValue])

  const fieldIdState = () => {
    return visitContext.visitState[field.fieldId]
  }

  const handleCheckListState = (e) => {
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
      <label htmlFor="value">
        <strong>{field.label}</strong>
      </label>
      {field.valueType == "string" && (
        <TextField
          label={field.label}
          value={fieldValue}
          onChange={(e) => {
            // visitContext.updateValue(field.fieldId, e.target.value)
            setFieldValue(e.target.value)
          }}
          inputProps={{
            style: { textTransform: "capitalize" },
          }}
        />

        // <input
        //   id="value"
        //   type="text"
        //   value={fieldValue}
        //   placeholder="Enter field value"
        //   onChange={(e) => {
        //     // visitContext.updateValue(field.fieldId, e.target.value)
        //     setFieldValue(e.target.value)
        //   }}
        // ></input>
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
      {field.valueType == "checklist" && (
        <FormGroup>
          {field.checklistItems.map((item, index) => (
            <FormControlLabel
              key={index}
              control={
                <Checkbox
                  // checked={state.checkedA}
                  value={item}
                  onChange={handleCheckListState}
                  name={item}
                />
              }
              label={item}
            />
          ))}
        </FormGroup>
      )}

      {/* <button type="submit">Save</button> */}
    </div>
  )
}

export default AddVisitFormField

// {Object.entries(field).map((ent, index) => (
//   <div key={index}>
//     {ent[0]} {ent[1]}
//   </div>
// ))}

// <Checkbox
//   checked={checked}
//   onChange={handleCheckListState}
//   inputProps={{ "aria-label": "primary checkbox" }}
// />
// <React.Fragment key={index}>
//   <input
//     onChange={handleCheckListState}
//     type="checkbox"
//     id={index}
//     name={item}
//     value={item}
//   ></input>
//   <label htmlFor={index}> {item}</label>
// </React.Fragment>
