import React, { useState } from "react"
import Checklist from "./Checklist"

export const EditVisitDiseases = (props) => {
  return (
    <div>
      <Checklist
        handleChecklistState={props.handleChecklistState}
        checklistItems={props.checklistItems}
        // checked={props.checklistItems}
        label={"Diseases"}
      />
    </div>
  )
}

export default EditVisitDiseases
