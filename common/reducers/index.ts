import { combineReducers } from "redux";
import authReducer from './auth';
import chatGptReducer from './chatGPT';
import tikopReducer from './tikop';

export default combineReducers({
  auth: authReducer,
  chatGPT: chatGptReducer,
  tikop: tikopReducer,
});
