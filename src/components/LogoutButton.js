import React from "react"
import { auth } from "../firebase/firebase"
import { useDispatch } from "react-redux"

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
    <div className="text-center mt-5 mb-2">
      <button
        className="btn btn-warning btn-lg rounded-pill px-5 text-dark"
        onClick={signOut}
      >
        Log Out
      </button>
    </div>
  )
}

export default LogoutButton
