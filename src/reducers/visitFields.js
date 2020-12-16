const defaultVisitFields = []

// manage general fields, not only related to a particular visit
export const visitFieldsReducer = (state = defaultVisitFields, action) => {
  switch (action.type) {
    case "SET_FIELDS":
      return action.fields
    case "ADD_FIELD":
      return state.concat([action.field])
    case "REMOVE_FIELD":
      return state.filter((field) => field.fieldId !== action.fieldId)
    case "EDIT_FIELD":
      return state.map((field) =>
        field.fieldId === action.fieldId
          ? { ...field, ...action.updates }
          : field
      )
    default:
      return state
  }
}

export default visitFieldsReducer
