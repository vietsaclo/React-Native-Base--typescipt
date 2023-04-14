import { LOCAL_STORAGE_KEYS } from "../../../common/@core/Consts";
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

export const loginByType = async (loginType: string): Promise<boolean> => {
  let profile: I_loggedInResponse | null = null;
  
  switch (loginType) {

    case LOCAL_STORAGE_KEYS.LOGIN.TYPE_FACEBOOK: {
      profile = await loginFacebook();
      break;
    }
    
    case LOCAL_STORAGE_KEYS.LOGIN.TYPE_GOOGLE: {
      profile = await loginGoogle();
      break;
    }

    case LOCAL_STORAGE_KEYS.LOGIN.TYPE_APPLE: {
      profile = await loginApple();
      break;
    }
  
    default:
      break;
  }

  if (!profile) {
    return false;
  }

  dispatchOrigin({
    type: ActionTypes.USER.LOGIN,
    payload: profile,
  });
  await Pubs.saveUserLoggedInStorage(profile);
  
  return true;
}

export const getProfileLogedIn = async (): Promise<I_loggedInResponse | null> => {
  const loginType = await Pubs.getStorageWithKey(LOCAL_STORAGE_KEYS.LOGIN.TYPE);

  let profile: I_loggedInResponse | null = null;
  switch (loginType) {

    case LOCAL_STORAGE_KEYS.LOGIN.TYPE_FACEBOOK: {
      profile = await getCurrentProfileFacebook(LOCAL_STORAGE_KEYS.LOGIN.TYPE_FACEBOOK);
      break;
    }
    
    case LOCAL_STORAGE_KEYS.LOGIN.TYPE_GOOGLE: {
      profile = await getCurrentProfileGoogle(LOCAL_STORAGE_KEYS.LOGIN.TYPE_GOOGLE);
      break;
    }

    case LOCAL_STORAGE_KEYS.LOGIN.TYPE_APPLE: {
      profile = await getCurrentProfileApple(LOCAL_STORAGE_KEYS.LOGIN.TYPE_APPLE);
      break;
    }
  
    default:
      break;
  }

  if (!profile) {
    profile = await Pubs.getUserLoggedInStorage();
  }

  return profile;
}

export const logoutByType = async (): Promise<boolean> => {
  const loginType = await Pubs.getStorageWithKey(LOCAL_STORAGE_KEYS.LOGIN.TYPE);

  let result: boolean = false;
  switch (loginType) {

    case LOCAL_STORAGE_KEYS.LOGIN.TYPE_FACEBOOK: {
      logoutFacebook();
      result = true;
      break;
    }

    case LOCAL_STORAGE_KEYS.LOGIN.TYPE_GOOGLE: {
      const isLogout = await logoutGoogle();
      result = isLogout;
      break;
    }

    case LOCAL_STORAGE_KEYS.LOGIN.TYPE_APPLE: {
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
