import React from "react"
import { useSelector, useDispatch } from "react-redux"
import Visit from "./Visit"

export const VisitsList = (props) => {
  const storeVisits = useSelector(({ visits }) =>
    visits ? visits.sort((a, b) => b.date - a.date) : visits
  )

  return (
    <div>
      {!!storeVisits &&
        storeVisits.map((visitData, index) => (
          <Visit key={index} data={visitData} />
        ))}
    </div>
  )
}

export default VisitsList
