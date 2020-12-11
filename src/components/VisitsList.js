import React from "react"
import { useSelector, useDispatch } from "react-redux"
import Visit from "./Visit"

export const VisitsList = (props) => {
  const visits = useSelector(({ visits }) => visits)

  console.log(visits, "to aqui no visits List")

  return (
    <div>
      VISITS LIST
      {!!visits &&
        visits.map((visit, index) => <Visit key={index} visit={visit} />)}
    </div>
  )
}

export default VisitsList
