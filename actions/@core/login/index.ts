import { APIs, LOCAL_STORAGE_KEYs } from "../../../common/@core/Consts";
import { I_loggedInResponse } from "../../../common/@core/Interfaces";
import Pubs from "../../../common/@core/Pubs";
import {
  getCurrentProfile as getCurrentProfileFacebook,
  login as loginFacebook,
  logout as logoutFacebook,
} from "./FacebookLogin";
import {
  getCurrentProfile as getCurrentProfileGoogle,
  login as loginGoogle,
  logout as logoutGoogle,
} from "./GoogleLogin";
import {
  getCurrentProfile as getCurrentProfileApple,
  login as loginApple,
  logout as LogoutApple,
} from "./AppleLogin";
import { dispatchOrigin } from "../../../common/@core/Store";
import { ActionTypes } from "../../../common/@core/ActionTypes";
import ApiClient from "../../../common/@core/ApiClient";

export const loginByType = async (loginType: string): Promise<boolean> => {
  let profile: I_loggedInResponse | null = null;

  switch (loginType) {

    case LOCAL_STORAGE_KEYs.LOGIN.TYPE_FACEBOOK: {
      profile = await loginFacebook();
      break;
    }

    case LOCAL_STORAGE_KEYs.LOGIN.TYPE_GOOGLE: {
      profile = await loginGoogle();
      break;
    }

    case LOCAL_STORAGE_KEYs.LOGIN.TYPE_APPLE: {
      profile = await loginApple();
      break;
    }

    default:
      break;
  }

  if (!profile) {
    return false;
  }

  // login to BE
  const isLoggedInBe = await loginToBE(profile);
  if (!isLoggedInBe) {
    return false;
  }

  dispatchOrigin({
    type: ActionTypes.USER.LOGIN,
    payload: profile,
  });
  await Pubs.saveUserLoggedInStorage(profile);

  return true;
}

export const loginToBE = async (profile: I_loggedInResponse): Promise<boolean> => {
  dispatchOrigin({ type: ActionTypes.GLOBLE_APP.SET_LOADING_TRUE });
  const body = {
    email: profile.email,
    loginType: profile.loggedInType?.substring(profile.loggedInType.lastIndexOf('_') + 1, profile.loggedInType.length),
    loginTypeUserId: profile.userId,
    loginTypeToken: profile.accessToken,
    userName: profile.name,
    avatar: profile.imageUrl,
  };
  const reuslt = await ApiClient.post(APIs.AUTH.SOCIAL, body).catch((_error) => {
    dispatchOrigin({ type: ActionTypes.GLOBLE_APP.SET_LOADING_FALSE });
    return { success: false, result: {} };
  });
  dispatchOrigin({ type: ActionTypes.GLOBLE_APP.SET_LOADING_FALSE });
  if (!reuslt.success) {
    return false;
  }

  profile.accessTokenFromBE = reuslt.result.gaurd.token;
  await Pubs.saveUserLoggedInStorage(profile);
  return true;
}

export const getProfileLogedIn = async (): Promise<I_loggedInResponse | null> => {
  dispatchOrigin({ type: ActionTypes.GLOBLE_APP.SET_LOADING_TRUE });
  let profile: I_loggedInResponse | null = await Pubs.getUserLoggedInStorage();

  dispatchOrigin({ type: ActionTypes.GLOBLE_APP.SET_LOADING_FALSE });
  return profile;
}

export const logoutByType = async (): Promise<boolean> => {
  const loginType = await Pubs.getStorageWithKey(LOCAL_STORAGE_KEYs.LOGIN.TYPE);

  let result: boolean = false;
  switch (loginType) {

    case LOCAL_STORAGE_KEYs.LOGIN.TYPE_FACEBOOK: {
      logoutFacebook();
      result = true;
      break;
    }

    case LOCAL_STORAGE_KEYs.LOGIN.TYPE_GOOGLE: {
      const isLogout = await logoutGoogle();
      result = isLogout;
      break;
    }

    case LOCAL_STORAGE_KEYs.LOGIN.TYPE_APPLE: {
      LogoutApple();
      result = true;
      break;
    }

    default:
      break;
  }

  if (result) {
    dispatchOrigin({ type: ActionTypes.USER.LOGOUT });
    await Pubs.clearUserLoggedInStorage();
  }

  return result;
}
