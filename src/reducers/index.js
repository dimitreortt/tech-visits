import authReducer from "./auth"
import visitsReducer from "./visits"
import { combineReducers } from "redux"

export const rootReducer = combineReducers({
  visits: visitsReducer,
  auth: authReducer,
})
