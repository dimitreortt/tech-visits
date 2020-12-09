import React from "react"
import { useSelector, useDispatch } from "react-redux"
import Visit from "./Visit"

export const VisitsList = (props) => {
  const visits = useSelector(({ visits }) =>
    visits ? visits.sort((a, b) => b.date - a.date) : visits
  )

  return (
    <div>
      {!!visits &&
        visits.map((visit, index) => <Visit key={index} visit={visit} />)}
    </div>
  )
}

export default VisitsList
