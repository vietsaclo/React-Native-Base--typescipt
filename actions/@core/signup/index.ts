import { ActionTypes } from "../../../common/@core/ActionTypes";
import ApiClient from "../../../common/@core/ApiClient"
import { APIs, LOCAL_STORAGE_KEYs } from "../../../common/@core/Consts"
import Pubs from "../../../common/@core/Pubs";
import { dispatchOrigin } from "../../../common/@core/Store";

export const SignUpWithEmail = async (email: string, password: string, displayName: string) => {
  dispatchOrigin({ type: ActionTypes.GLOBLE_APP.SET_LOADING_TRUE, payload: 'Sign Up...' });
  const dataRes = await ApiClient.post(APIs.USER.ROOT, {
    email,
    displayName,
    password,
  });

  if (dataRes.success) {
    const token = dataRes.result.gaurd.refresh;
    await Pubs.saveUserLoggedInStorage({
      accessToken: token,
      email: email,
      imageUrl: dataRes.result.user.avatar || '',
      loggedInType: LOCAL_STORAGE_KEYs.LOGIN.TYPE_GOOGLE,
      name: displayName,
      permissions: [],
      userId: dataRes.result.user.id,
      userIdFromBE: dataRes.result.user.id,
      accessTokenFromBE: token,
    });
  }
  dispatchOrigin({ type: ActionTypes.GLOBLE_APP.SET_LOADING_FALSE, payload: 'Sign Up...' });
  return dataRes;
}

export const LoginWithEmailAndPassword = async (email: string, password: string) => {
  dispatchOrigin({ type: ActionTypes.GLOBLE_APP.SET_LOADING_TRUE, payload: 'Login...' });
  const dataRes = await ApiClient.post(APIs.AUTH.ROOT, {
    email,
    password,
  });

  if (dataRes.success) {
    const token = dataRes.result.gaurd.refresh;
    await Pubs.saveUserLoggedInStorage({
      accessToken: token,
      email: email,
      imageUrl: dataRes.result.user.avatar || '',
      loggedInType: LOCAL_STORAGE_KEYs.LOGIN.TYPE_GOOGLE,
      name: dataRes.result.user.fullName,
      permissions: [],
      userId: dataRes.result.user.id,
      userIdFromBE: dataRes.result.user.id,
      accessTokenFromBE: token,
    });
  }
  dispatchOrigin({ type: ActionTypes.GLOBLE_APP.SET_LOADING_FALSE, payload: 'Login...' });
  return dataRes;
}
