import React, { useEffect, useState } from "react"
import "bootstrap/dist/css/bootstrap.css"
import "../styles/styles.scss"
import Header from "./Header"
import NoteForm from "./NoteForm"
import db from "../firebase/firebase"
import { useSelector, useDispatch } from "react-redux"
import NoteList from "./NoteList"
import Footer from "./Footer"
import LogoutButton from "./LogoutButton"
import AddNoteButton from "./AddNoteButton"

export const FieldNotesApp = () => {
  const dispatch = useDispatch()
  const listSize = useSelector(({ notes }) => (notes ? notes.length : 0))
  const [showForm, setShowForm] = useState(false)
  const userId = useSelector(({ auth }) => auth)

  useEffect(() => {
    const downloadNotes = () => {
      db.collection(`users`)
        .doc(userId)
        .collection("notes")
        .get()
        .then((snapshot) => {
          let notes = []
          snapshot.forEach((noteSnap) => {
            // convert TIMESTAMP to Date
            let data = noteSnap.data()
            data.date = data.date.toDate()
            data.noteId = noteSnap.id
            notes.push(data)
          })

          dispatch({ type: "SET_NOTES", notes })
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
      <Header />
      <div className="container app-content my-5">
        {!listSize && <h1 className="py-3">Please, start taking notes!</h1>}
        <AddNoteButton toggleShowForm={toggleShowForm} />
        {showForm && <NoteForm toggleShowForm={toggleShowForm} />}
        <NoteList />
        <LogoutButton />
      </div>
      <Footer />
    </div>
  )
}

export default FieldNotesApp
