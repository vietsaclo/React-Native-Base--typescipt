import { combineReducers } from "redux";
import authReducer from './auth';
import chatGptReducer from './chatGPT';
import tikopReducer from './tikop';
import globleAppReducer from './globleApp';

export default combineReducers({
  auth: authReducer,
  chatGPT: chatGptReducer,
  tikop: tikopReducer,
  globalApp: globleAppReducer,
});
