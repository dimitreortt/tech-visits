import React from "react"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"

export default function AlertDialog(props) {
  const [open, setOpen] = React.useState(true)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = (anything) => {
    props.setShouldUpdate(false)
    setOpen(false)
  }

  const handleClickYes = () => {
    props.setShouldUpdate(true)
    setOpen(false)
  }

  const handleClickNo = () => {
    props.setShouldUpdate(false)
    setOpen(false)
  }

  return (
    <div>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open alert dialog
      </Button> */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Updated Fields"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to fulfill recently added fields?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickYes} color="primary" autoFocus>
            Yes
          </Button>
          <Button onClick={handleClickNo} color="seconday">
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
