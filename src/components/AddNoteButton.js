import React from "react"

export const AddNoteButton = (props) => {
  return (
    <div className="add-button d-flex">
      <button
        className="btn btn-success p-3 flex-fill"
        onClick={props.toggleShowForm}
      >
        ADD
      </button>
    </div>
  )
}

export default AddNoteButton
