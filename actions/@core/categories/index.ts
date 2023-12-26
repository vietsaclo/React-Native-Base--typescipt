import { ActionTypes } from "../../../common/@core/ActionTypes";
import ApiClient from "../../../common/@core/ApiClient"
import { APIs } from "../../../common/@core/Consts";
import { dispatchOrigin } from "../../../common/@core/Store";

export const getCategories = async () => {
  dispatchOrigin({ type: ActionTypes.GLOBLE_APP.SET_LOADING_TRUE });
  const dataRes = await ApiClient.get(APIs.CATEGORY.ROOT);
  dispatchOrigin({ type: ActionTypes.GLOBLE_APP.SET_LOADING_FALSE });
  return dataRes;
}
