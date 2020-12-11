import React, { useState, useEffect } from "react"
import VisitForm from "./AddVisitForm"
import { useDispatch, useSelector } from "react-redux"
import removeVisit from "../db/removeVisit"
import VisitField from "./VisitField"
import updateVisitEntries from "../db/updateVisitEntries"
import VisitAddFieldForm from "./AddVisitFieldPaper"

// export const Visit = ({ data: { description, author, date, visitId } }) => {
export const Visit = ({ visit }) => {
  const [inEditMode, setInEditMode] = useState(false)
  const [inAddFieldMode, setInAddFieldMode] = useState(false)
  const dispatch = useDispatch()
  const [entries, setEntries] = useState([])
  const visitFields = useSelector(({ visitFields }) => visitFields)

  useEffect(() => {
    const entries = Object.entries(visit).filter(
      ([key, value]) => key != "visitId" && key != "fieldId"
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

  const mapFieldsIdsToObjects = () => {
    let fieldsObjs = {}
    visitFields.forEach((field) => {
      // idsToLabels[field.fieldId] = field.label
      fieldsObjs[field.fieldId] = field
    })
    return fieldsObjs
  }

  const fieldIdToObj = (id) => {
    const fieldsObjs = mapFieldsIdsToObjects()
    return fieldsObjs[id]
  }

  return (
    <div>
      {entries.map(([fieldId, value]) => {
        const fieldObj = fieldIdToObj(fieldId)
        console.log(fieldObj, "fieldObj")

        return (
          <VisitField
            key={fieldId}
            editField={editField}
            fieldValue={value}
            fieldValueType={fieldObj.valueType}
            fieldLabel={fieldObj.label}
            editable={!fieldObj.isDefault}
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
