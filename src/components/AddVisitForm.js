import React, { useState, useEffect } from "react"
import "react-datepicker/dist/react-datepicker.css"
import DatePicker from "react-datepicker"
import { useDispatch, useSelector } from "react-redux"
import addVisit from "../db/addVisit"
import updateVisit from "../db/updateVisit"
import { AddVisitFormField } from "./AddVisitFormField"
import AddVisitContext from "../contexts/addVisitContext"
import db from "../firebase/firebase"

export const AddVisitForm = (props) => {
  const [dateInput, setDateInput] = useState(new Date())
  const [nameInput, setNameInput] = useState("")
  const [descriptionInput, setDescriptionInput] = useState("")
  const dispatch = useDispatch()
  const userId = useSelector(({ auth }) => auth)
  const fieldId = useSelector(({ fieldId }) => fieldId)
  const visitFields = useSelector(({ visitFields }) => visitFields)
  const visitFieldsIds = useSelector(({ visitFields }) =>
    visitFields.map((visitField) => visitField.fieldId)
  )
  // console.log(visitFields, visitFieldsIds)

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

  const mapFieldsIdsToStateObject = (ids) => {
    let stateObj = {}
    ids.forEach((id) => {
      stateObj[id] = ""
    })
    return stateObj
  }

  const [visitState, setVisitState] = useState()

  const resetVisitState = () => {
    setVisitState(mapFieldsIdsToStateObject(visitFieldsIds))
  }

  useEffect(() => {
    resetVisitState()
  }, [visitFields])

  useEffect(() => {
    console.log(visitState)
  }, [visitState])

  const updateValue = (key, val) => {
    setVisitState({ ...visitState, [key]: val })
  }

  const verifyStateRequirements = () => {
    // VERIFICAR SE OS REQUERIMENTOS SÃO ATENDIDOS
    let errorMessage = ""
    visitFields.forEach((field) => {
      if (field.required && visitState[field.fieldId] == "") {
        errorMessage += "Field " + field.label + " is required!\n"
      }
    })
    if (errorMessage) {
      alert(errorMessage)
      return false
    }
    return true
  }

  const addVisit = () => {
    // DISPACHAR PARA O BD E PARA O REDUX
    console.log(visitState, "in save")
    console.log(visitFields, "in save")

    if (!verifyStateRequirements()) {
      return
    }

    let visitObj = { ...visitState, fieldId }
    db.collection("visits")
      .add(visitObj)
      .then((docRef) => {
        dispatch({
          type: "ADD_VISIT",
          visit: { ...visitObj, visitId: docRef.id },
        })
      })
      .catch((e) => console.log(e))

    // resetVisitState()
    props.toggleShowForm()
  }

  return (
    <div>
      <AddVisitContext.Provider value={{ visitState, updateValue }}>
        {visitFields.map((field, index) => (
          <AddVisitFormField field={field} key={index} />
        ))}
        <button onClick={addVisit}>Save</button>
      </AddVisitContext.Provider>
    </div>
  )
}

export default AddVisitForm

{
  /* <form onSubmit={onFormSubmit}>
        <div>
          <div>
            <div>
              <label htmlFor="nameInput" className="ml-1">
                Author Name
              </label>
              <input
                id="nameInput"
                type="text"
                placeholder="Enter Name"
                value={nameInput}
                onChange={onInputChange}
              ></input>
            </div>
            <div>
              <label htmlFor="descriptionInput" className="ml-1">
                Description
              </label>
              <textarea
                id="nameInput"
                placeholder="Enter Description"
                rows="3"
                onChange={onDescriptionInputChange}
                value={descriptionInput}
              ></textarea>
            </div>
          </div>
          <div>
            <div>
              <div>
                <label className="d-block">Date</label>
                <DatePicker
                  selected={dateInput}
                  onChange={(date) => setDateInput(date)}
                  id="dateInput"
                />
              </div>
              <div>
                <button type="submit">Save</button>
              </div>
            </div>
          </div>
        </div>
      </form> */
}
