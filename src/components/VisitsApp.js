import React, { useEffect, useState } from "react"
import NoteForm from "./VisitForm"
import { useSelector, useDispatch } from "react-redux"
import VisitsList from "./VisitsList"
import LogoutButton from "./LogoutButton"
import AddVisitButton from "./AddVisitButton"
import { useParams } from "react-router-dom"
import downloadVisits from "../db/downloadVisits"

export const FieldNotesApp = () => {
  const dispatch = useDispatch()
  const listSize = useSelector(({ visits }) => (visits ? visits.length : 0))
  const [showForm, setShowForm] = useState(false)
  const fieldId = useSelector(({ fieldId }) => fieldId)
  const params = useParams()

  useEffect(() => {
    downloadVisits(fieldId, dispatch)
  }, [fieldId])

  useEffect(() => {
    dispatch({ type: "SET_FIELD_ID", fieldId: params.fieldId })
  }, [])

  const toggleShowForm = () => {
    setShowForm(!showForm)
  }

  return (
    <div>
      <div>
        {!!fieldId && fieldId}
        {!listSize && <h1>Please, describe your firt visit!</h1>}
        <AddVisitButton toggleShowForm={toggleShowForm} />
        {showForm && <NoteForm toggleShowForm={toggleShowForm} />}
        <VisitsList />
        <LogoutButton />
      </div>
    </div>
  )
}

export default FieldNotesApp
