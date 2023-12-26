import { LoginManager, AccessToken, Profile } from "react-native-fbsdk-next";
import { I_loggedInResponse } from "../../../common/@core/Interfaces";
import Pubs from "../../../common/@core/Pubs";
import { LOCAL_STORAGE_KEYs } from "../../../common/@core/Consts";
import { Settings } from 'react-native-fbsdk-next';

// Ask for consent first if necessary
// Possibly only do this for iOS if no need to handle a GDPR-type flow
Settings.initializeSDK();

const defaultPermissions = ["public_profile"];

export const login = async (permissions: string[] = defaultPermissions): Promise<I_loggedInResponse | null> => {
  return new Promise((resolve, _reject) => {
    Pubs.saveStorageWithKey(LOCAL_STORAGE_KEYs.LOGIN.TYPE, LOCAL_STORAGE_KEYs.LOGIN.TYPE_FACEBOOK)
      .then((_) => {
        LoginManager.logInWithPermissions(permissions).then(
          function (result: any) {
            if (result.isCancelled) {
              console.log("Login cancelled");
              resolve(null);
            } else {
              console.log(
                "Login success with permissions: " +
                result.grantedPermissions.toString()
              );
              getCurrentProfile().then((data) => {
                resolve(data);
              });
            }
          },
          function (error) {
            console.log("Login fail with error: " + error);
            resolve(null);
          }
        );
      });
  });
}

export const getCurrentProfile = async (loggedInType: string | null = null): Promise<I_loggedInResponse | null> => {
  let isError: any = null;

  if (!loggedInType) {
    loggedInType = await Pubs.getStorageWithKey(LOCAL_STORAGE_KEYs.LOGIN.TYPE);
  }

  // get access token
  const dataAccessToken = await AccessToken.getCurrentAccessToken()
    .catch((error) => {
      isError = error;
      return null;
    });
  if (!dataAccessToken) {
    console.log(isError);
    return null;
  }

  // get profile
  const currentProfile = await Profile.getCurrentProfile()
    .catch((error) => {
      isError = error;
      return null;
    });
  if (!currentProfile) {
    console.log(isError);
    return null;
  }

  const result: I_loggedInResponse = {
    loggedInType: loggedInType,
    permissions: defaultPermissions,
    accessToken: dataAccessToken.accessToken.toString(),
    name: currentProfile.name,
    userId: currentProfile.userID,
    email: currentProfile.email,
    imageUrl: currentProfile.imageURL,
  };

  return result;
}

export const logout = (): void => {
  LoginManager.logOut();
}
