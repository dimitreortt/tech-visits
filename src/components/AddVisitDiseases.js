import React, { useState } from "react"
import AddButton from "./AddButton"
import { SubmitButton } from "./SubmitButton"
import { TextField } from "@material-ui/core"
import Checklist from "./Checklist"
import { addDisease } from "../db/addDisease"
import { useSelector, useDispatch } from "react-redux"

export const AddVisitDiseases = (props) => {
  const [inAddMode, setInAddMode] = useState(false)
  const [newDiseaseName, setNewDiseaseName] = useState("")
  const dispatch = useDispatch()
  const diseasesField = useSelector(({ visitFields }) =>
    visitFields.find((field) => field.label === "DOENÇAS")
  )

  const toggleInAddMode = () => {
    setInAddMode(!inAddMode)
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if (!newDiseaseName) {
      return alert("Disease name must not be empty!")
    }

    console.log(newDiseaseName, "in addDisease")
    addDisease(diseasesField, newDiseaseName, dispatch)
  }

  return (
    <div>
      <Checklist
        handleChecklistState={props.handleChecklistState}
        checklistItems={props.checklistItems}
        label={"DOENÇAS"}
        checkedItems={props.checkedItems}
      />
      <AddButton label={"ADICIONAR DOENÇA"} onClick={toggleInAddMode} />
      {inAddMode && (
        <form onSubmit={onSubmit}>
          <TextField
            label={"NOVA DOENÇA"}
            value={newDiseaseName}
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
