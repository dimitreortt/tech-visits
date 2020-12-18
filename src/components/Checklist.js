import React, { useState, useEffect } from "react"
import { Checkbox, FormGroup, FormControlLabel } from "@material-ui/core"
import ListSubheader from "@material-ui/core/ListSubheader"
import { ChecklistItem } from "./ChecklistItem"

const useStyles = (theme) => ({
  subHeader: {
    padding: 0,
    "margin-top": "10px",
  },
})

export const Checklist = ({
  handleChecklistState,
  checklistItems,
  label,
  checkedItems,
}) => {
  const classes = useStyles()

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
