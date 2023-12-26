import { ActionTypes } from "../ActionTypes";
import { I_IndexedMusicState } from "../Interfaces";

interface I_MusicActionType {
  type: string,
  payload: any,
}

const initialState: I_IndexedMusicState = {
  currentIndex: -1,
  listMusics: [],
}

const IndexedMusicReducer = (state: I_IndexedMusicState = initialState, action: I_MusicActionType) => {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.INDEXED_MUSICS.SET_LIST_MUSICS:
      return Object.assign({}, {
        ...state,
        listMusics: payload,
      });

    case ActionTypes.INDEXED_MUSICS.SET_CURRENT_INDEX: {
      return Object.assign({}, {
        ...state,
        currentIndex: payload,
      });
    }

    default:
      return state;
  }
};

export default IndexedMusicReducer;
