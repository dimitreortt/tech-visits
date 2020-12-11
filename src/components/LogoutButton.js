import React from "react"
import { auth } from "../firebase/firebase"
import { useDispatch } from "react-redux"
import { Button } from "@material-ui/core"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"

export const LogoutButton = (props) => {
  const dispatch = useDispatch()

  const signOut = () => {
    auth
      .signOut()
      .then(() => {
        console.log("Sign-out successful.")
        alert("User has been successfully signed out!")
        dispatch({ type: "LOGOUT" })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <Button
      variant="contained"
      color="secondary"
      // className={classes.button}
      onClick={signOut}
      startIcon={<ExitToAppIcon />}
      fullWidth
    >
      Log Out
    </Button>
    // <div className="text-center mt-5 mb-2">
    //   <button
    //     className="btn btn-warning btn-lg rounded-pill px-5 text-dark"
    //     onClick={signOut}
    //   >
    //     Log Out
    //   </button>
    // </div>
  )
}

export default LogoutButton
