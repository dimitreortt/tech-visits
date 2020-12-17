import React, { useState } from "react"
import Checklist from "./Checklist"

export const EditVisitDiseases = (props) => {
  return (
    <div>
      <Checklist
        handleChecklistState={props.handleChecklistState}
        checklistItems={props.checklistItems}
        checkedItems={props.checkedItems}
        label={"Diseases"}
      />
    </div>
  )
}

export default EditVisitDiseases
