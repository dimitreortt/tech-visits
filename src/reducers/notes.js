let defaultNotesState = []

export const notesReducer = (state = defaultNotesState, action) => {
  switch (action.type) {
    case "ADD_NOTE":
      return state.concat([action.note])
    case "REMOVE_NOTE":
      return state.filter((note) => note.noteId != action.noteId)
    case "EDIT_NOTE":
      return state.map((note) =>
        note.noteId === action.note.noteId ? action.note : note
      )
    case "SET_NOTES":
      return action.notes
    default:
      return state
  }
}

export default notesReducer
