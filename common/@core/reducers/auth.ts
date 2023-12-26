import { ActionTypes } from "../ActionTypes";
import { I_loggedInResponse } from "../Interfaces";

interface I_authActionType {
  type: string,
  payload?: any,
}

const initialState: I_loggedInResponse = {
  permissions: [],
  loggedInType: null,
  accessToken: '',
  name: null,
  imageUrl: null,
  email: null,
  userId: null,
}

const authReducer = (state = initialState, action: I_authActionType) => {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.USER.LOGIN:
      return Object.assign({}, payload);
    case ActionTypes.USER.LOGOUT:
      return Object.assign({}, initialState);
    default:
      return state;
  }
};

export default authReducer;
