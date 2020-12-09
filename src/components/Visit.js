import React, { useState } from "react"
import db from "../firebase/firebase"
import VisitForm from "./VisitForm"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import removeVisit from "../db/removeVisit"

export const Visit = ({ data: { description, author, date, visitId } }) => {
  const [inEditMode, setInEditMode] = useState(false)
  const dispatch = useDispatch()

  const handleRemoveVisit = () => {
    removeVisit(visitId, dispatch)
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
            <button onClick={handleRemoveVisit}>Remove</button>
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
