import React from "react"
import { Button } from "@material-ui/core"

export const SubmitButton = (props) => {
  return (
    <div>
      <Button
        // variant="contained"
        // variant="outlined"
        variant="contained"
        color="primary"
        type="submit"
        size="small"
        onClick={props.onClick}
        fullWidth
      >
        SALVAR
      </Button>
    </div>
  )
}
