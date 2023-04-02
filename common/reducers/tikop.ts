import { ActionTypes } from "../ActionTypes";
import { I_tikopState } from "../Interfaces";

interface I_tikopActionType {
  type: string,
  payload: any,
}

const initialState: I_tikopState = {
  totalDate: 0,
  cashWithdraw: 0,
  currentIndexWithdraw: 0,
  currentDateWithdraw: '',
  startDate: '',
}
const tikopReducer = (state: I_tikopState = initialState, action: I_tikopActionType) => {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.TIKOP.UPDATE:
      return Object.assign({}, {
        ...state,
        ...payload,
      });
    
    default:
      return state;
  }
};

export default tikopReducer;
