import { combineReducers, createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";

import baseReducer from "./base";
import { initSaga } from "./sagas";
import projectReducer from "./projects";

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  base: baseReducer,
  projects: projectReducer,
});

const store = createStore(rootReducer, applyMiddleware(logger, sagaMiddleware));

window.store = store;

sagaMiddleware.run(initSaga);

export default store;
