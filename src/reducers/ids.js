let defaultIdsReducer = { fieldId: null }

export const idsReducer = (state = defaultIdsReducer, action) => {
  switch (action.type) {
    case "SET_FIELD_ID":
      return { ...state, fieldId: action.fieldId }
    case "NULLIFY_FIELD_ID":
      return { ...state, fieldId: null }
    case "SET_VISIT_DATE_ID":
      return { ...state, visitDateFieldId: action.visitDateFieldId }
    default:
      return state
  }
}

export default idsReducer
