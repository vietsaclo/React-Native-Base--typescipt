import { appleAuth } from '@invertase/react-native-apple-authentication';
import { I_loggedInResponse } from '../../../common/@core/Interfaces';
import { LOCAL_STORAGE_KEYs } from '../../../common/@core/Consts';

const defaultPermissions: number[] = [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL]

export const login = async (permissions: number[] = defaultPermissions): Promise<I_loggedInResponse | null> => {
  try {
    // performs login request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      // Note: it appears putting FULL_NAME first is important, see issue #293
      requestedScopes: permissions,
    });

    // get current authentication state for user
    // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
    const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);

    // use credentialState response to ensure the user is authenticated
    if (credentialState === appleAuth.State.AUTHORIZED) {
      // user is authenticated
      const payload: I_loggedInResponse = {
        loggedInType: LOCAL_STORAGE_KEYs.LOGIN.TYPE_APPLE,
        permissions: appleAuthRequestResponse.authorizedScopes.map((v) => v.toString()),
        accessToken: appleAuthRequestResponse.identityToken,
        name: appleAuthRequestResponse.fullName?.nickname,
        imageUrl: null,
        email: appleAuthRequestResponse.email,
        userId: appleAuthRequestResponse.user,
      }

      return payload;
    }

    return null;
  } catch (error: any) {
    if (error.code === appleAuth.Error.CANCELED) {
      console.warn('User canceled Apple Sign in.');
    } else {
      console.error(error);
    }
    return null;
  }
}

export const getCurrentProfile = async (loggedInType: string | null = null): Promise<I_loggedInResponse | null> => {
  // TODO: get current profile
  return null;
}

export const logout = (): void => {
  // TODO: logout
}
