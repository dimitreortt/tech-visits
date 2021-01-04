import React, { useState } from "react"
import AddButton from "./AddButton"
import { SubmitButton } from "./SubmitButton"
import { TextField } from "@material-ui/core"
import Checklist from "./Checklist"
import { useSelector, useDispatch } from "react-redux"
import { addPlague } from "../db/addPlagues"

export const AddVisitPlagues = (props) => {
  const [inAddMode, setInAddMode] = useState(false)
  const [newPlagueName, setNewDiseaseName] = useState("")
  const dispatch = useDispatch()
  const diseasesField = useSelector(({ visitFields }) =>
    visitFields.find((field) => field.label === "PRAGAS")
  )

  const toggleInAddMode = () => {
    setInAddMode(!inAddMode)
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if (!newPlagueName) {
      return alert("Plague name must not be empty!")
    }

    console.log(newPlagueName, "in addDisease")
    addPlague(diseasesField, newPlagueName, dispatch)
  }

  return (
    <div>
      <Checklist
        handleChecklistState={props.handleChecklistState}
        checklistItems={props.checklistItems}
        label={"DOENÇAS"}
        checkedItems={props.checkedItems}
      />
      <AddButton label={"Adicionar Praga"} onClick={toggleInAddMode} />
      {inAddMode && (
        <form onSubmit={onSubmit}>
          <TextField
            label={"NOVA PRAGA"}
            value={newPlagueName}
            variant="filled"
            size="small"
            onChange={(e) => {
              // visitContext.updateValue(field.fieldId, e.target.value)
              setNewDiseaseName(e.target.value)
            }}
            inputProps={{
              style: { textTransform: "capitalize" },
            }}
          />
          <SubmitButton />
        </form>
      )}
    </div>
  )
}
