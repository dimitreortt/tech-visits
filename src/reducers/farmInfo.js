let initialState = {
    farmInfo: null,
    growerInfo: null
}

export const farmInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_FARM_INFO":
        console.log("action pwd =>", action)
      return  {
        farmInfo: action.farmInfo,
        growerInfo:  action.growerInfo
      }
    default:
      return state
  }
}

export default farmInfoReducer