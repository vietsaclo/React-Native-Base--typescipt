import { ActionTypes } from "../ActionTypes";
import { I_MusicState } from "../Interfaces";

interface I_MusicActionType {
  type: string,
  payload: any,
}

const initialState: I_MusicState = {
  isPlaying: false,
  musicFile: '',
  duration: 0,
  currentTime: 0,
  isPause: false,
  musicName: '',
  musicCategory: '',
  initialedMusic: false,
}
const MusicReducer = (state: I_MusicState = initialState, action: I_MusicActionType) => {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.MUSIC_PLAY.PLAY_MUSIC:
      return Object.assign({}, {
        ...state,
        isPlaying: false,
        musicFile: payload.musicFile,
        musicName: payload.musicName,
        musicCategory: payload.musicCategory,
        initialedMusic: false,
      });
    case ActionTypes.MUSIC_PLAY.SET_PLAYING_MUSIC: {
      return Object.assign({}, {
        ...state,
        isPlaying: true,
        currentTime: 0,
        duration: 0,
      });
    }
    case ActionTypes.MUSIC_PLAY.CANCEL_MUSIC: {
      return Object.assign({}, {
        ...state,
        isPlaying: false,
        musicFile: '',
      });
    }
    case ActionTypes.MUSIC_PLAY.SET_INFO_TIME: {
      return Object.assign({}, {
        ...state,
        duration: payload.duration,
        currentTime: payload.currentTime,
        initialedMusic: payload.initialedMusic,
      });
    }
    case ActionTypes.MUSIC_PLAY.PAUSE_OR_RESUME_MUSIC: {
      return Object.assign({}, {
        ...state,
        isPause: !state.isPause,
      });
    }

    default:
      return state;
  }
};

export default MusicReducer;
