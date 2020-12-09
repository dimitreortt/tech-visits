import React from "react"

export const AddVisitButton = (props) => {
  return (
    <div>
      <button onClick={props.toggleShowForm}>ADD</button>
    </div>
  )
}

export default AddVisitButton
