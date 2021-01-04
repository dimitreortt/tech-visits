import React, { useState, Fragment } from "react"
import {
  Container,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core"
import AddVisitButton from "../components/AddVisitButton"
import AddVisitForm from "../components/AddVisitForm"
import LogoutButton from "../components/LogoutButton"
import VisitsList from "../components/VisitsList"
import AddButton from "../components/AddButton"
import AddVisitFieldPaper from "../components/AddVisitFieldPaper"
import Navbar from "../components/navbar/Navbar"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(1),
    // backgroundColor: "purple"
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}))

export const HomePage = () => {
  const [showForm, setShowForm] = useState(false)
  const [inAddFieldMode, setInAddFieldMode] = useState(false)
  const classes = useStyles()

  const toggleInAddFieldMode = () => {
    setInAddFieldMode(!inAddFieldMode)
  }

  const toggleShowForm = () => {
    setShowForm(!showForm)
  }

  return (
    <Fragment>
      <Navbar />
      <Container maxWidth="lg" className={classes.root}>
        <Grid container spacing={1} justify="space-around">
          <Grid item xs={12} sm={4}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <Typography variant="h3" component="h2" gutterBottom>
                    Field Name
                  </Typography>
                  <Typography variant="h4" component="h2" gutterBottom>
                    Grower Name
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <AddVisitButton
                  toggleShowForm={toggleShowForm}
                  isFormShowing={showForm}
                />
              </Grid>
              <Grid item xs={12}>
                {showForm && <AddVisitForm toggleShowForm={toggleShowForm} />}
              </Grid>
              <Grid item xs={12}>
                {/* <AddFieldButton toggleInAddFieldMode={toggleInAddFieldMode} /> */}
                <AddButton
                  onClick={toggleInAddFieldMode}
                  label={"ADICIONAR CAMPO"}
                />
              </Grid>
              <Grid item xs={12}>
                {inAddFieldMode && (
                  <AddVisitFieldPaper
                    toggleInAddFieldMode={toggleInAddFieldMode}
                  />
                )}
              </Grid>
              {/* <Grid item xs={12}>
              <LogoutButton />
            </Grid> */}
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} spacing={1}>
            <VisitsList />
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  )
}
