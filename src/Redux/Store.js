import logger from "redux-logger";
import { createStore, applyMiddleware } from "redux";
import { rootReducer } from "./Reducer";

const store = createStore(rootReducer, applyMiddleware(logger));
export default store;
