import { ActionTypes } from "../ActionTypes";

interface I_gptActionType {
  type: string,
  payload: any,
}

const initialState = {
  loading: false,
  talks: [],
}
const chatGptReducer = (state = initialState, action: I_gptActionType) => {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.CHAT_GPT.LOADING:
      return Object.assign({}, {
        ...state,
        loading: payload.loading,
      });
    case ActionTypes.CHAT_GPT.ME:
      return Object.assign({}, {
        loading: false,
        talks: [...state.talks, {
          role: ActionTypes.CHAT_GPT.ME,
          message: payload.message
        }],
      });
    case ActionTypes.CHAT_GPT.GPT:
      return Object.assign({}, {
        loading: false,
        role: ActionTypes.CHAT_GPT.GPT,
        talks: [...state.talks, {
          role: ActionTypes.CHAT_GPT.GPT,
          message: payload.message
        }],
      });
    default:
      return state;
  }
};

export default chatGptReducer;
