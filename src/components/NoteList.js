import React from "react"
import { useSelector, useDispatch } from "react-redux"
import Note from "./Note"

export const NoteList = (props) => {
  const storeNotes = useSelector(({ notes }) =>
    notes ? notes.sort((a, b) => b.date - a.date) : notes
  )

  return (
    <div className="notes-list">
      {!!storeNotes &&
        storeNotes.map((noteData, index) => (
          <Note key={index} data={noteData} />
        ))}
    </div>
  )
}

export default NoteList
