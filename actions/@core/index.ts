import { ActionTypes } from "../../common/@core/ActionTypes"
import ApiClient from "../../common/@core/ApiClient";
import { dispatchOrigin } from "../../common/@core/Store"

export const getApiAC = async (api: string) => {
  dispatchOrigin({ type: ActionTypes.GLOBLE_APP.SET_LOADING_TRUE });
  const dataRes = await ApiClient.get(api);

  dispatchOrigin({ type: ActionTypes.GLOBLE_APP.SET_LOADING_FALSE });
  return dataRes;
}

export const putApiAC = async (api: string, data?: any) => {
  dispatchOrigin({ type: ActionTypes.GLOBLE_APP.SET_LOADING_TRUE });
  const dataRes = await ApiClient.put(api, data);

  dispatchOrigin({ type: ActionTypes.GLOBLE_APP.SET_LOADING_FALSE });
  return dataRes;
}
