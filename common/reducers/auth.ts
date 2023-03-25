import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActionTypes } from "../ActionTypes";

interface I_authActionType {
  type: string,
  payload: any,
}

interface I_authStateType {
  isLoggedIn: boolean,
  user: string,
}

let initialState: I_authStateType = { isLoggedIn: false, user: '' }

// saved key|value pair
AsyncStorage.getItem("user").then((value) => {
  if (value) {
    initialState = { isLoggedIn: true, user: value }
  }
});

const authReducer = (state = initialState, action: I_authActionType) => {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.USER.LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
      };
    case ActionTypes.USER.LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
};

export default authReducer;
