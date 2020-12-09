import React, { useEffect, useState } from "react"
import NoteForm from "./VisitForm"
import db from "../firebase/firebase"
import { useSelector, useDispatch } from "react-redux"
import VisitsList from "./VisitsList"
import LogoutButton from "./LogoutButton"
import AddVisitButton from "./AddVisitButton"

export const FieldNotesApp = () => {
  const dispatch = useDispatch()
  const listSize = useSelector(({ visits }) => (visits ? visits.length : 0))
  const [showForm, setShowForm] = useState(false)
  const userId = useSelector(({ auth }) => auth)

  useEffect(() => {
    const downloadNotes = () => {
      db.collection(`users`)
        .doc(userId)
        .collection("visits")
        .get()
        .then((snapshot) => {
          let visits = []
          snapshot.forEach((visitSnap) => {
            // convert TIMESTAMP to Date
            let data = visitSnap.data()
            data.date = data.date.toDate()
            data.visitId = visitSnap.id
            visits.push(data)
          })

          dispatch({ type: "SET_VISITS", visits })
          console.log(visits)
        })
        .then(() => {
          console.log("Notes have been successfully downloaded!")
        })
        .catch((e) => console.log(e))
    }

    downloadNotes()
  }, [])

  const toggleShowForm = () => {
    setShowForm(!showForm)
  }

  return (
    <div>
      <div>
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
