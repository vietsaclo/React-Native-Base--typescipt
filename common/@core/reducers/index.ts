import { combineReducers } from "redux";
import authReducer from './auth';
import chatGptReducer from './chatGPT';
import tikopReducer from './tikop';
import globleAppReducer from './globleApp';
import webRTCReducer from "./WebRTCReducer";
import musicReducer from "./MusicReducer";
import IndexedMusicReducer from "./IndexedMusicReducer";

export default combineReducers({
  userLogged: authReducer,
  chatGPT: chatGptReducer,
  tikop: tikopReducer,
  globalApp: globleAppReducer,
  webRTC: webRTCReducer,
  music: musicReducer,
  indexedMusic: IndexedMusicReducer,
});
