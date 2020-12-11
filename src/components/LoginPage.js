import React from "react"
import Avatar from "@material-ui/core/Avatar"
import Button from "@material-ui/core/Button"
import CssBaseline from "@material-ui/core/CssBaseline"
import TextField from "@material-ui/core/TextField"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from "@material-ui/core/Checkbox"
import Link from "@material-ui/core/Link"
import Grid from "@material-ui/core/Grid"
import Box from "@material-ui/core/Box"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import { auth } from "../firebase/firebase"

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  )
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

export default function SignIn() {
  const classes = useStyles()

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

    let inputTags = e.target.getElementsByTagName("input")
    const email = inputTags[0].value
    const password = inputTags[1].value
    // console.log(email, password, "in on form submit!!")
    signIn(email, password)
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={onFormSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  )
}

// import React from "react"
// import { useDispatch } from "react-redux"
// import { auth } from "../firebase/firebase"

// export const LoginPage = (props) => {
//   const dispatch = useDispatch()

//   const signIn = (email, password) => {
//     auth
//       .signInWithEmailAndPassword(email, password)
//       .then(() => {
//         alert("The user has been successfully signed in!")
//       })
//       .catch((error) => {
//         console.log(`Error: ${error.message}`)
//         alert(error.message)
//       })
//   }

//   const onFormSubmit = (e) => {
//     e.preventDefault()

//     const email = e.target[0].value
//     const password = e.target[1].value
//     signIn(email, password)
//   }

//   return (
//     <div>
//       <div>
//         <div>FIELD NOTES</div>
//         <p>Start to get your notes under control!</p>
//         <form onSubmit={onFormSubmit}>
//           <div>
//             <div>
//               <label htmlFor="mailInput">E-mail</label>
//               <input
//                 type="email"
//                 placeholder="Enter E-mail"
//                 id="mainInput"
//               ></input>
//             </div>
//             <div>
//               <label htmlFor="passwordInput">Password</label>
//               <input
//                 type="password"
//                 placeholder="Enter Password"
//                 id="passwordInput"
//               ></input>
//             </div>
//           </div>
//           <button type="submit">Login with E-mail</button>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default LoginPage
