import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import Visit from "./Visit"
import { Typography } from "@material-ui/core"

export const VisitsList = (props) => {
  const ids = useSelector(({ ids }) => ids)
  const visits = useSelector(({ visits }) => {
    return visits
  })

  useEffect(() => {
    console.log(visits, "visits mudou")
  }, [visits])

  const compareNewest = (visit1, visit2) => {
    return visit2[ids.visitDateFieldId] - visit1[ids.visitDateFieldId]
  }

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
        visits.sort(compareNewest).map((visit, index) => {
          return <Visit key={visit.visitId} visit={visit} />
        })}
    </div>
  )
}

export default VisitsList
