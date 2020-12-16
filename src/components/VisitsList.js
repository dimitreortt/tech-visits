import React from "react"
import { useSelector, useDispatch } from "react-redux"
import Visit from "./Visit"
import { Typography } from "@material-ui/core"

export const VisitsList = (props) => {
  const visits = useSelector(({ visits }) => visits)

  return (
    <div>
      <Typography
        variant="h3"
        component="h2"
        gutterBottom
        color="primary"
        align="center"
      >
        Visits List
      </Typography>
      {!!visits &&
        visits.map((visit, index) => <Visit key={index} visit={visit} />)}
    </div>
  )
}

export default VisitsList
