import React, { useState } from "react"
import { Checkbox, FormGroup, FormControlLabel } from "@material-ui/core"

export const ChecklistItem = ({ handleChecklistState, item, isChecked }) => {
  return (
    <div>
      <FormControlLabel
        control={
          <Checkbox
            // checked={state.checkedA}
            value={item}
            onChange={(e) => {
              handleChecklistState(e)
            }}
            name={item}
            checked={isChecked}
            // checked={checked.includes(item)}
          />
        }
        label={item}
      />
    </div>
  )
}
