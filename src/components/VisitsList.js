import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import Visit from "./Visit"
import { Typography } from "@material-ui/core"

export const VisitsList = (props) => {
  const visits = useSelector(({ visits }) => visits)

  useEffect(() => {
    console.log(visits, "visits mudou")
  }, [visits])

  return (
    <div>
      <Typography
        variant="h5"
        gutterBottom
        // color="primary"
        align="center"
      >
        VISITAS TÉCNICAS
      </Typography>
      {!!visits &&
        visits.map((visit, index) => <Visit key={index} visit={visit} />)}
    </div>
  )
}

export default VisitsList
