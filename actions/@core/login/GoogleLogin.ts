import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import Pubs from '../../../common/@core/Pubs';
import { LOCAL_STORAGE_KEYs } from '../../../common/@core/Consts';
import { I_loggedInResponse } from '../../../common/@core/Interfaces';

const defaultConfig = {
  scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
  // webClientId: '<FROM DEVELOPER CONSOLE>', // client ID of type WEB for your server (needed to verify user ID and offline access)
  // offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  // hostedDomain: '', // specifies a hosted domain restriction
  // forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
  // accountName: '', // [Android] specifies an account name on the device that should be used
  // iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
  // googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
  // openIdRealm: '', // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
  // profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
};

GoogleSignin.configure(defaultConfig);

// Somewhere in your code
export const login = async (): Promise<I_loggedInResponse | null> => {
  await Pubs.saveStorageWithKey(LOCAL_STORAGE_KEYs.LOGIN.TYPE, LOCAL_STORAGE_KEYs.LOGIN.TYPE_GOOGLE);
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    const payload: I_loggedInResponse = {
      loggedInType: LOCAL_STORAGE_KEYs.LOGIN.TYPE_GOOGLE,
      permissions: userInfo.scopes,
      accessToken: userInfo.idToken,
      name: userInfo.user.name,
      imageUrl: userInfo.user.photo,
      email: userInfo.user.email,
      userId: userInfo.user.id,
    }

    return payload;
  } catch (error: any) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // user cancelled the login flow
      console.log('// user cancelled the login flow');
    } else if (error.code === statusCodes.IN_PROGRESS) {
      // operation (e.g. sign in) is in progress already
      console.log('// operation (e.g. sign in) is in progress already');
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // play services not available or outdated
      console.log('// play services not available or outdated');
    } else {
      // some other error happened
      console.log('// some other error happened');
    }

    return null;
  }
};

export const getCurrentProfile = async (loggedInType: string | null = null): Promise<I_loggedInResponse | null> => {
  const currentUser = await GoogleSignin.getCurrentUser();
  if (!currentUser) {
    return null;
  }

  if (!loggedInType) {
    loggedInType = await Pubs.getStorageWithKey(LOCAL_STORAGE_KEYs.LOGIN.TYPE);
  }

  const result: I_loggedInResponse = {
    loggedInType: loggedInType,
    permissions: currentUser.scopes,
    accessToken: currentUser.idToken,
    name: currentUser.user.name,
    imageUrl: currentUser.user.photo,
    email: currentUser.user.email,
    userId: currentUser.user.id,
  }

  return result;
};

export const logout = async (): Promise<boolean> => {
  try {
    await GoogleSignin.signOut();

    return true;
  } catch (error) {
    console.error(error);

    return false;
  }
};
