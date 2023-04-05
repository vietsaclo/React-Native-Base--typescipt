import { ActionTypes } from "../ActionTypes";
import { I_globalAppState } from "../Interfaces";

interface I_globalAppActionType {
  type: string,
  payload: any,
}

const initialState: I_globalAppState = {
  viewCurrentCount: 0,
  withdrawIndexCount: 0,
  tikopNumber: 0,
}
const globleAppReducer = (state: I_globalAppState = initialState, action: I_globalAppActionType) => {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.GLOBLE_APP.UPDATE:
      return Object.assign({}, {
        ...state,
        ...payload,
      });
    
    default:
      return state;
  }
};

export default globleAppReducer;
