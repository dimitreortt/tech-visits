import authReducer from "./auth"
import visitsReducer from "./visits"
import { combineReducers } from "redux"
import idsReducer from "./ids"

export const rootReducer = combineReducers({
  visits: visitsReducer,
  auth: authReducer,
  fieldId: idsReducer,
})
