import React from "react"
import { useDispatch } from "react-redux"
import { auth } from "../firebase/firebase"

export const LoginPage = (props) => {
  const dispatch = useDispatch()

  const signIn = (email, password) => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        alert("The user has been successfully signed in!")
      })
      .catch((error) => {
        console.log(`Error: ${error.message}`)
        alert(error.message)
      })
  }

  const onFormSubmit = (e) => {
    e.preventDefault()

    const email = e.target[0].value
    const password = e.target[1].value
    signIn(email, password)
  }

  return (
    <div>
      <div>
        <div>FIELD NOTES</div>
        <p>Start to get your notes under control!</p>
        <form onSubmit={onFormSubmit}>
          <div>
            <div>
              <label htmlFor="mailInput">E-mail</label>
              <input
                type="email"
                placeholder="Enter E-mail"
                id="mainInput"
              ></input>
            </div>
            <div>
              <label htmlFor="passwordInput">Password</label>
              <input
                type="password"
                placeholder="Enter Password"
                id="passwordInput"
              ></input>
            </div>
          </div>
          <button type="submit">Login with E-mail</button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
