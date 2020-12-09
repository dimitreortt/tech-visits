let defaultVisitsState = []

export const visitsReducer = (state = defaultVisitsState, action) => {
  switch (action.type) {
    case "ADD_VISIT":
      return state.concat([action.visit])
    case "REMOVE_VISIT":
      return state.filter((visit) => visit.visitId != action.visitId)
    case "EDIT_VISIT":
      return state.map((visit) =>
        visit.visitId === action.visit.visitId ? action.visit : visit
      )
    case "EDIT_VISIT_ENTRIES":
      return state.map((visit) =>
        visit.visitId === action.visit.visitId ? action.visit : visit
      )
    case "SET_VISITS":
      return action.visits
    default:
      return state
  }
}

export default visitsReducer
