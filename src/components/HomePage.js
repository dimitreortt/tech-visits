import React, { useState } from "react"
import {
  Container,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core"
import AddVisitButton from "./AddVisitButton"
import VisitForm from "./VisitForm"
import LogoutButton from "./LogoutButton"
import VisitsList from "./VisitsList"
import AddButton from "./AddButton"
import AddVisitFieldPaper from "./AddVisitFieldPaper"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(1),
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
    <Container maxWidth="md" className={classes.root}>
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
              <AddVisitButton toggleShowForm={toggleShowForm} />
            </Grid>
            <Grid item xs={12}>
              {showForm && <VisitForm toggleShowForm={toggleShowForm} />}
            </Grid>
            <Grid item xs={12}>
              {/* <AddFieldButton toggleInAddFieldMode={toggleInAddFieldMode} /> */}
              <AddButton onClick={toggleInAddFieldMode} label={"Add Field"} />
            </Grid>
            <Grid item xs={12}>
              {inAddFieldMode && (
                <AddVisitFieldPaper
                  toggleInAddFieldMode={toggleInAddFieldMode}
                />
              )}
            </Grid>
            <Grid item xs={12}>
              <LogoutButton />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6} spacing={1}>
          <VisitsList />
        </Grid>
      </Grid>
    </Container>
  )
}
