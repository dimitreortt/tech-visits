import { applyMiddleware, createStore } from "redux"
import thunkMiddleware from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"

// import monitorReducersEnhancer from "./enhancers/monitorReducers"
// import loggerMiddleware from "./middleware/logger"
import { rootReducer } from "../reducers/index"

export default function configureStore(preloadedState) {
  // const middlewares = [loggerMiddleware, thunkMiddleware]
  const middlewares = [thunkMiddleware]
  const middlewareEnhancer = applyMiddleware(...middlewares)

  // const enhancers = [middlewareEnhancer, monitorReducersEnhancer]
  const enhancers = [middlewareEnhancer]
  const composedEnhancers = composeWithDevTools(...enhancers)

  const store = createStore(rootReducer, preloadedState, composedEnhancers)

  return store
}
