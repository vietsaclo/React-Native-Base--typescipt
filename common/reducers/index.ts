import { combineReducers } from "redux";
import authReducer from './auth';
import chatGptReducer from './chatGPT';

export default combineReducers({
  auth: authReducer,
  chatGPT: chatGptReducer,
});
