import { ActionTypes } from "../ActionTypes";
import { I_WebRTCState } from "../Interfaces";

interface I_WebRTCActionType {
  type: string,
  payload: any,
}

const initialState: I_WebRTCState = {

}

const webRTCReducer = (state: I_WebRTCState = initialState, action: I_WebRTCActionType) => {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.WEB_RTC.UPDATE_MY_STREAM: {
      return Object.assign({}, {
        ...state,
        myStream: payload,
      });
    }
    default:
      return state;
  }
};

export default webRTCReducer;
