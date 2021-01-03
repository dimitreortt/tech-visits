import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import HomeIcon from "@material-ui/icons/Home"
import Button from "@material-ui/core/Button"

import UsernameButtonAndMenuComponent from "./UsernameButtonAndMenuComponent"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}))

export default function Navbar() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Button
            variant="contained"
            color="primary"
            startIcon={<HomeIcon />}
            onClick={() => {
              window.open("https://coopasvtech.web.app/", "_blank")
            }}
          >
            COOPASVTech
          </Button>

          <Typography variant="h6" className={classes.title}>
            {" "}
          </Typography>

          {/* <Typography variant="h6" className={classes.title}>
            News
          </Typography> */}

          <UsernameButtonAndMenuComponent />

          {/* <Typography variant="h6" color="inherit">
            COOPASVTech
          </Typography> */}
        </Toolbar>
      </AppBar>
    </div>
  )
}
