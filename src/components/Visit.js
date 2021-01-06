import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import removeVisit from "../db/removeVisit"
import VisitField from "./VisitField"
import { Paper, Box, Grid, Button } from "@material-ui/core"
import EditVisitForm from "./EditVisitForm"

export const Visit = ({ visit }) => {
  const [inEditMode, setInEditMode] = useState(false)
  const dispatch = useDispatch()
  const [entries, setEntries] = useState([])
  const visitFormFields = useSelector(({ visitFields }) => visitFields)
  const fieldsOrder = useSelector(({ fieldsOrder }) => fieldsOrder)

  useEffect(() => {
    let entries = Object.entries(visit).filter(
      ([key, value]) => key !== "visitId" && key !== "fieldId"
    )

    entries.sort((e1, e2) => {
      return fieldsOrder[e1[0]] - fieldsOrder[e2[0]]
    })

    // console.log(entries, "entries")

    setEntries(entries)
    // console.log(entries, "entries")
  }, [visit])

  useEffect(() => {
    // console.log(visitFormFields, "visitFormFields")
  }, [visitFormFields])

  const handleRemoveVisit = () => {
    removeVisit(visit.visitId, dispatch)
  }

  const toggleInEditMode = () => {
    setInEditMode(!inEditMode)
  }

  const mapFieldsIdsToObjects = () => {
    let fieldsObjs = {}
    visitFormFields.forEach((field) => {
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
                return undefined
              }

              return (
                <Grid item xs={12} key={fieldId}>
                  <VisitField
                    fieldValue={value}
                    fieldValueType={fieldObj.valueType}
                    fieldLabel={fieldObj.label}
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
            <EditVisitForm
              entries={entries}
              visitFormFields={visitFormFields}
              visitId={visit.visitId}
              toggleInEditMode={toggleInEditMode}
            />
          )}
        </Box>
      </Paper>
    </Box>
  )
}

export default Visit
