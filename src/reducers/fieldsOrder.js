const defaultOrder = []

const fieldsOrderReducer = (state = defaultOrder, action) => {
  switch (action.type) {
    case "SET_FIELDS_ORDER":
      return action.orderObj
    default:
      return state
  }
}

export default fieldsOrderReducer
