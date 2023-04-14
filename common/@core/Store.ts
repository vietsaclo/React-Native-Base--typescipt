import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";

const middleware = [thunk];
const store = createStore(reducers, applyMiddleware(...middleware));
export default store;

const { dispatch } = store;

export const dispatchOrigin = dispatch;
