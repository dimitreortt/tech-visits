import React from "react"
import DeleteIcon from "@material-ui/icons/Delete"
import AddCircleIcon from "@material-ui/icons/AddCircle"
import { Button } from "@material-ui/core"

export const AddVisitButton = (props) => {
  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        // className={classes.button}
        onClick={props.toggleShowForm}
        startIcon={<AddCircleIcon />}
        fullWidth
      >
        Add Visit
      </Button>
    </div>
  )
}

export default AddVisitButton
