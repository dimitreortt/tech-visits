import React, { useState, useEffect } from "react"
import VisitForm from "./VisitForm"
import { useDispatch, useSelector } from "react-redux"
import removeVisit from "../db/removeVisit"
import VisitField from "./VisitField"
import updateVisitEntries from "../db/updateVisitEntries"
import { Paper, Box, Grid, Button } from "@material-ui/core"

export const Visit = ({ visit }) => {
  const [inEditMode, setInEditMode] = useState(false)
  const dispatch = useDispatch()
  const [entries, setEntries] = useState([])
  const visitFields = useSelector(({ visitFields }) => visitFields)

  useEffect(() => {
    const entries = Object.entries(visit).filter(
      ([key, value]) => key != "visitId" && key != "fieldId"
    )
    setEntries(entries)
    console.log(entries, "entries")
  }, [])

  const handleRemoveVisit = () => {
    removeVisit(visit.visitId, dispatch)
  }

  const toggleInEditMode = () => {
    setInEditMode(!inEditMode)
  }

  const dispatchWithPrivateFields = (newEntries) => {
    const privateFields = [["fieldId", visit.fieldId]]
    updateVisitEntries(
      newEntries.concat(privateFields),
      visit.visitId,
      dispatch
    )
  }

  const editField = (oldKey, newKey, newValue) => {
    let newEntries = entries.map(([key, value]) => {
      if (key == oldKey) {
        return [newKey, newValue]
      }
      return [key, value]
    })

    setEntries(newEntries)
    dispatchWithPrivateFields(newEntries)
  }

  const mapFieldsIdsToObjects = () => {
    let fieldsObjs = {}
    visitFields.forEach((field) => {
      fieldsObjs[field.fieldId] = field
    })
    return fieldsObjs
  }

  const fieldIdToObj = (id) => {
    const fieldsObjs = mapFieldsIdsToObjects()
    return fieldsObjs[id]
  }

  return (
    <Box marginBottom={1}>
      <Paper>
        <Grid container spacing={1}>
          <Box marginX={2} marginY={1}>
            {entries.map(([fieldId, value]) => {
              const fieldObj = fieldIdToObj(fieldId)
              if (!fieldObj) {
                return
              }

              return (
                <Grid item xs={12} key={fieldId}>
                  <VisitField
                    editField={editField}
                    fieldValue={value}
                    fieldValueType={fieldObj.valueType}
                    fieldLabel={fieldObj.label.capitalize()}
                    editable={!fieldObj.isDefault}
                  />
                </Grid>
              )
            })}
          </Box>
        </Grid>
        <Box marginX={1}>
          <Grid container spacing={1}>
            <Grid item xs={6} sm={4}>
              <Button
                variant="outlined"
                color="primary"
                onClick={toggleInEditMode}
                size="small"
                fullWidth
              >
                Edit
              </Button>
            </Grid>
            <Grid item xs={6} sm={4}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleRemoveVisit}
                size="small"
                fullWidth
              >
                Remove
              </Button>
            </Grid>
          </Grid>
          {inEditMode && (
            <VisitForm
              setInEditMode={setInEditMode}
              editVisitMode={true}
              entries={entries}
            />
          )}
        </Box>
      </Paper>
    </Box>
  )
}

export default Visit
