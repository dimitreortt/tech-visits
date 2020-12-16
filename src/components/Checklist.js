import React from "react"
import { Checkbox, FormGroup, FormControlLabel } from "@material-ui/core"
import ListSubheader from "@material-ui/core/ListSubheader"

const useStyles = (theme) => ({
  subHeader: {
    padding: 0,
    "margin-top": "10px",
  },
})

export const Checklist = ({
  checklistItems,
  handleChecklistState,
  label,
  checked,
}) => {
  const classes = useStyles()

  return (
    !!checklistItems && (
      <FormGroup>
        {/* <strong>{label.capitalize()}</strong> */}
        <strong>{label.capitalize()}</strong>
        {checklistItems.map((item, index) => (
          <FormControlLabel
            key={index}
            control={
              <Checkbox
                // checked={state.checkedA}
                value={item}
                onChange={handleChecklistState}
                name={item}
                // checked={checked.includes(item)}
              />
            }
            label={item}
          />
        ))}
      </FormGroup>
    )
  )
}

export default Checklist
