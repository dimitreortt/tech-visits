import React from "react"
// import DeleteIcon from "@material-ui/icons/Delete"
import AddCircleIcon from "@material-ui/icons/AddCircle"
import CancelIcon from '@material-ui/icons/Cancel'
import { Button } from "@material-ui/core"

export const AddVisitButton = (props) => {
  return (
    <div>
      {(props.isFormShowing)?(
        <Button
        variant="outlined"
        color="primary"
        // className={classes.button}
        onClick={props.toggleShowForm}
        startIcon={<CancelIcon />}
        fullWidth
      >
        CANCELAR
      </Button>
      ):(
        <Button
        variant="contained"
        color="primary"
        // className={classes.button}
        onClick={props.toggleShowForm}
        startIcon={<AddCircleIcon />}
        fullWidth
      >
         REGISTRAR VISITA
      </Button>

      )}
    </div>
  )
}

export default AddVisitButton
