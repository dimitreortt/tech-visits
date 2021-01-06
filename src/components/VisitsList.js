import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import Visit from "./Visit"
import { Typography } from "@material-ui/core"

export const VisitsList = (props) => {
  const visits = useSelector(({ visits, ids }) => {
    const compareNewest = (visit1, visit2) => {
      return visit2[ids.visitDateFieldId] - visit1[ids.visitDateFieldId]
    }
    return visits.sort(compareNewest)
  })

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
