import React, { useState } from "react"
import db from "../firebase/firebase"
import NoteForm from "./NoteForm"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"

export const Note = ({ data: { description, author, date, noteId } }) => {
  const [inEditMode, setInEditMode] = useState(false)
  const dispatch = useDispatch()
  const userId = useSelector(({ auth }) => auth)

  const removeNote = () => {
    db.collection(`users`)
      .doc(userId)
      .collection("notes")
      .doc(noteId)
      .delete()
      .then(() => {
        console.log("Note was successfully deleted")
        dispatch({ type: "REMOVE_NOTE", noteId })
      })
      .catch((error) => console.log(error))
  }

  const toggleInEditMode = () => {
    setInEditMode(!inEditMode)
  }

  return (
    <div className="note border border-secondary rounded my-2">
      <div className="mx-1 font-weight-bold">Description</div>
      <div className="border border-secondary rounded p-2 mx-1 bg-white">
        <p className="note__description">{description}</p>
      </div>
      <div className="container">
        <div className="row my-1">
          <div className="col px-1">
            <div className="p-2 border rounded bg-light">
              <strong>Date: </strong>
              {date.toLocaleDateString()}
            </div>
          </div>
          <div className="col px-1">
            <div className="p-2 border rounded bg-light">
              <strong>Author: </strong>
              {author}
            </div>
          </div>
          <div className="col px-1">
            <button
              className="btn btn-outline-success btn-block h-100"
              onClick={toggleInEditMode}
            >
              Edit
            </button>
          </div>
          <div className="col px-1">
            <button
              className="btn btn-outline-danger btn-block h-100"
              onClick={removeNote}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
      {inEditMode && (
        <div className="container m-1 mt-2">
          <NoteForm
            setInEditMode={setInEditMode}
            note={{
              description,
              author,
              date,
              noteId,
            }}
          />
        </div>
      )}
    </div>
  )
}

export default Note
