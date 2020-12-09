import React, { useState, useEffect } from "react"
import VisitForm from "./VisitForm"
import { useDispatch } from "react-redux"
import removeVisit from "../db/removeVisit"
import VisitField from "./VisitField"
import updateVisitEntries from "../db/updateVisitEntries"
import VisitAddFieldForm from "./VisitAddFieldForm"

// export const Visit = ({ data: { description, author, date, visitId } }) => {
export const Visit = ({ visit }) => {
  const [inEditMode, setInEditMode] = useState(false)
  const [inAddFieldMode, setInAddFieldMode] = useState(false)
  const dispatch = useDispatch()
  const [entries, setEntries] = useState([])

  useEffect(() => {
    let entries = Object.entries(visit).filter(
      ([key, value]) => key != "fieldId" && key != "visitId"
    )
    setEntries(entries)
  }, [])

  const handleRemoveVisit = () => {
    removeVisit(visit.visitId, dispatch)
  }

  const toggleInEditMode = () => {
    setInEditMode(!inEditMode)
  }

  const toggleInAddFieldMode = () => {
    setInAddFieldMode(!inAddFieldMode)
  }

  const dispatchWithPrivateFields = (newEntries) => {
    const privateFields = [["fieldId", visit.fieldId]]
    updateVisitEntries(
      newEntries.concat(privateFields),
      visit.visitId,
      dispatch
    )
  }

  const addField = (fieldName, fieldValue) => {
    if (visit[fieldName]) {
      return alert("This fieldName already exists")
    }

    let newEntries = entries.concat([[fieldName, fieldValue]])
    setEntries(newEntries)
    dispatchWithPrivateFields(newEntries)
  }

  const editField = (oldKey, newKey, newValue) => {
    let newEntries = entries.map(([key, value]) => {
      if (key == oldKey) {
        return [newKey, newValue]
      }
      return [key, value]
    })

    setEntries(newEntries)
    dispatchWithPrivateFields(newEntries)
  }

  const onFieldFormSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div>
      {entries.map(([key, value], index) => {
        if (value instanceof Date) {
          // value = value.toLocaleDateString()
        }
        // console.log(index, "index")
        // console.log(key, value)
        return (
          <VisitField
            key={key}
            editField={editField}
            fieldValue={value}
            fieldKey={key}
          />
        )
      })}
      <div>
        <button onClick={toggleInAddFieldMode}>Add Field</button>
        {inAddFieldMode && <VisitAddFieldForm addField={addField} />}
      </div>
      <div>
        <button onClick={toggleInEditMode}>Edit</button>
      </div>
      <div>
        <button onClick={handleRemoveVisit}>Remove</button>
      </div>
      {inEditMode && <VisitForm setInEditMode={setInEditMode} visit={visit} />}
    </div>
  )
}

export default Visit
