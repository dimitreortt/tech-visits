import React, { useState } from "react"
import db from "../firebase/firebase"
import VisitForm from "./VisitForm"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"

export const Visit = ({ data: { description, author, date, visitId } }) => {
  const [inEditMode, setInEditMode] = useState(false)
  const dispatch = useDispatch()
  const userId = useSelector(({ auth }) => auth)

  const removeVisit = () => {
    db.collection(`users`)
      .doc(userId)
      .collection("visits")
      .doc(visitId)
      .delete()
      .then(() => {
        console.log("Visit was successfully deleted")
        dispatch({ type: "REMOVE_VISIT", visitId })
      })
      .catch((error) => console.log(error))
  }

  const toggleInEditMode = () => {
    setInEditMode(!inEditMode)
  }

  return (
    <div>
      <div>
        <strong>Description: </strong>
        {description}
      </div>
      <div>
        <div>
          <div>
            <div>
              <strong>Date: </strong>
              {date.toLocaleDateString()}
            </div>
          </div>
          <div>
            <div>
              <strong>Author: </strong>
              {author}
            </div>
          </div>
          <div>
            <button onClick={toggleInEditMode}>Edit</button>
          </div>
          <div>
            <button onClick={removeVisit}>Remove</button>
          </div>
        </div>
      </div>
      {inEditMode && (
        <div>
          <VisitForm
            setInEditMode={setInEditMode}
            visit={{
              description,
              author,
              date,
              visitId,
            }}
          />
        </div>
      )}
    </div>
  )
}

export default Visit
