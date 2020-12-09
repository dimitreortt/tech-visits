const defaultAuthState = null

export const authReducer = (state = defaultAuthState, action) => {
  switch (action.type) {
    case "LOGIN":
      return action.userId
    case "LOGOUT":
      return null
    default:
      return state
  }
}

export default authReducer
