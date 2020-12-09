let defaultIdsReducer = null

export const idsReducer = (state = defaultIdsReducer, action) => {
  switch (action.type) {
    case "SET_FIELD_ID":
      return action.fieldId
    case "NULLIFY_FIELD_ID":
      return null
    default:
      return state
  }
}

export default idsReducer
