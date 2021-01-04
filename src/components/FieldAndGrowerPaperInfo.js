import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from "react-redux"

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
    //   color: theme.palette.text.secondary,
    },
}))

export default function FieldAndGrowerPaperInfo() {
    const classes = useStyles()

    const [farmName, setfarmName] = useState("...")
    const [growerName, setgrowerName] = useState("...")
    const farmInfoGlobalState = useSelector(({ farmInfoReducer }) => farmInfoReducer)

    useEffect(() => {
      console.log("farmInfoGlobalState useSelector =>", farmInfoGlobalState)
      if (farmInfoGlobalState.farmInfo !== null) {
        setfarmName(farmInfoGlobalState.farmInfo.body)
      }
      if (farmInfoGlobalState.growerInfo !== null) {
        setgrowerName(farmInfoGlobalState.growerInfo.name)
      }
    }, [farmInfoGlobalState])

    return (
        <Fragment>
            <Paper className={classes.paper}>
                  <Typography variant="h4"  gutterBottom>
                   {farmName}
                  </Typography>
                  <Typography variant="h5" gutterBottom>
                    {growerName}
                  </Typography>
            </Paper>
        </Fragment>
    )
}
