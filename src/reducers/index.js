import authReducer from "./auth"
import visitsReducer from "./visits"
import { combineReducers } from "redux"
import idsReducer from "./ids"
import visitFieldsReducer from "./visitFields"
import farmInfoReducer from "./farmInfo"
import fieldsOrderReducer from "./fieldsOrder"

export const rootReducer = combineReducers({
  visits: visitsReducer,
  auth: authReducer,
  ids: idsReducer,
  visitFields: visitFieldsReducer,
  farmInfoReducer: farmInfoReducer,
  fieldsOrder: fieldsOrderReducer,
})
