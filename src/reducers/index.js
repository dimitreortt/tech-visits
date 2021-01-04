import authReducer from "./auth"
import visitsReducer from "./visits"
import { combineReducers } from "redux"
import idsReducer from "./ids"
import visitFieldsReducer from "./visitFields"
import farmInfoReducer from './farmInfo'

export const rootReducer = combineReducers({
  visits: visitsReducer,
  auth: authReducer,
  fieldId: idsReducer,
  visitFields: visitFieldsReducer,
  farmInfoReducer: farmInfoReducer
})
