import React, { useState, useEffect } from "react"
import "react-datepicker/dist/react-datepicker.css"
import DatePicker from "react-datepicker"
import { useDispatch, useSelector } from "react-redux"
import addVisit from "../db/addVisit"
import updateVisit from "../db/updateVisit"

export const VisitForm = (props) => {
  const [dateInput, setDateInput] = useState(new Date())
  const [nameInput, setNameInput] = useState("")
  const [descriptionInput, setDescriptionInput] = useState("")
  const dispatch = useDispatch()
  const userId = useSelector(({ auth }) => auth)
  const fieldId = useSelector(({ fieldId }) => fieldId)

  useEffect(() => {
    if (!!props.visit) {
      const { date, author, description } = props.visit
      setDateInput(date)
      setNameInput(author)
      setDescriptionInput(description)
    }
  }, [])

  const onInputChange = (e) => {
    setNameInput(e.target.value)
  }

  const onDescriptionInputChange = (e) => {
    setDescriptionInput(e.target.value)
  }

  const onFormSubmit = (e) => {
    e.preventDefault()

    if (!nameInput || !descriptionInput) {
      alert("Please fill all fields!")
      return
    }

    const visit = {
      author: nameInput,
      description: descriptionInput,
      date: dateInput,
    }
    !!props.visit
      ? updateVisit(visit, props.visit.visitId, dispatch).then(() => {
          setNameInput("")
          setDescriptionInput("")
          props.setInEditMode(false)
        })
      : addVisit(visit, fieldId, dispatch).then(() => {
          setNameInput("")
          setDescriptionInput("")
          props.toggleShowForm()
        })
  }

  return (
    <div className="visit-form border border-success rounded">
      <form className="" onSubmit={onFormSubmit}>
        <div className="row">
          <div className="col-sm-12 col-md-8">
            <div className="form-group">
              <label htmlFor="nameInput" className="ml-1">
                Author Name
              </label>
              <input
                id="nameInput"
                className="form-control"
                type="text"
                placeholder="Enter Name"
                value={nameInput}
                onChange={onInputChange}
              ></input>
            </div>
            <div className="form-group">
              <label htmlFor="descriptionInput" className="ml-1">
                Description
              </label>
              <textarea
                id="nameInput"
                className="form-control"
                placeholder="Enter Description"
                rows="3"
                onChange={onDescriptionInputChange}
                value={descriptionInput}
              ></textarea>
            </div>
          </div>
          <div className="col-sm-12 col-md-4">
            <div className="h-100 d-flex flex-column justify-content-between align-items-center">
              <div className="form-group justify-content-center">
                <label className="d-block">Date</label>
                <DatePicker
                  selected={dateInput}
                  onChange={(date) => setDateInput(date)}
                  className="form-control"
                  id="dateInput"
                />
              </div>
              <div className="col align-self-end d-flex align-items-center">
                <button
                  type="submit"
                  className="btn btn-outline-success btn-lg rounded-pill btn-block"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default VisitForm
