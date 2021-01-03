import React, { useState, useEffect } from "react"
import { FormGroup } from "@material-ui/core"
import { ChecklistItem } from "./ChecklistItem"

export const Checklist = ({
  handleChecklistState,
  checklistItems,
  label,
  checkedItems,
}) => {
  const [areChecked, setAreChecked] = useState([])

  useEffect(() => {
    setAreChecked(checkedItems)
  }, [checkedItems])

  return (
    !!checklistItems && (
      <FormGroup>
        {/* <strong>{label.capitalize()}</strong> */}
        <strong>{label}</strong>
        {checklistItems.map((item, index) => (
          <ChecklistItem
            handleChecklistState={handleChecklistState}
            isChecked={areChecked ? areChecked.includes(item) : false}
            key={index}
            item={item}
          />
        ))}
      </FormGroup>
    )
  )
}

export default Checklist
