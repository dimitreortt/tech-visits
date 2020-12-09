import React, { useState, useEffect } from "react"
import { auth } from "../firebase/firebase"
import { useDispatch } from "react-redux"

export const useIsLoggedIn = () => {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    let mounted = true
    const verifyAuthState = () => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          console.log("User is signed in")
          dispatch({ type: "LOGIN", userId: user.uid })
        } else {
          console.log("No user is signed in")
          dispatch({ type: "LOGOUT" })
        }
        if (mounted) {
          setLoading(false)
        }
      })
    }

    verifyAuthState()
    // cleanup function
    return () => (mounted = false)
  }, [])

  return [loading]
}

export default useIsLoggedIn
