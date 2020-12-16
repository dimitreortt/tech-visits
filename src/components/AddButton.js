import React from "react"
import AddCircleIcon from "@material-ui/icons/AddCircle"
import { Button } from "@material-ui/core"

export const AddButton = (props) => {
  return (
    <div>
      <Button
        // variant="contained"
        variant="outlined"
        color="primary"
        onClick={props.onClick}
        size="small"
        startIcon={<AddCircleIcon />}
        fullWidth
      >
        {props.label}
      </Button>
    </div>
  )
}

export default AddButton
