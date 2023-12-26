import { ActionTypes } from "../ActionTypes";
import { NAMES_DEFAULT } from "../Consts";
import { I_globalAppState } from "../Interfaces";

interface I_globalAppActionType {
  type: string,
  payload: any,
}

const loadingTextDefault = 'Loading...';

const initialState: I_globalAppState = {
  viewCurrentCount: 0,
  withdrawIndexCount: 0,
  tikopNumber: 0,
  loading: false,
  loadingText: loadingTextDefault,
  isPurchase: false,
  totalImageAssets: 0,
  showPopupBuyPro: false,
  quotesTheme: '',
  quotesCategory: 1,
  quotesCategoryName: NAMES_DEFAULT.QUOTES_DEFAULT_FIRST_LOAD,
}
const globleAppReducer = (state: I_globalAppState = initialState, action: I_globalAppActionType) => {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.GLOBLE_APP.UPDATE:
      return Object.assign({}, {
        ...state,
        ...payload,
      });
    case ActionTypes.GLOBLE_APP.SET_LOADING_TRUE:
      return Object.assign({}, {
        ...state,
        loading: true,
        loadingText: payload || loadingTextDefault,
      });
    case ActionTypes.GLOBLE_APP.SET_LOADING_FALSE:
      return Object.assign({}, {
        ...state,
        loading: false,
        loadingText: payload || loadingTextDefault,
      });
    case ActionTypes.GLOBLE_APP.SET_PURCHASED:
      return Object.assign({}, {
        ...state,
        isPurchase: true,
      });
    case ActionTypes.GLOBLE_APP.SET_SHOW_POPUP_BUY_PRO:
      return Object.assign({}, {
        ...state,
        showPopupBuyPro: payload,
      });
    case ActionTypes.GLOBLE_APP.UPDATE_QUOTES_THEME:
      return Object.assign({}, {
        ...state,
        quotesTheme: payload,
      });
    case ActionTypes.GLOBLE_APP.UPDATE_QUOTES_CATEGORY:
      return Object.assign({}, {
        ...state,
        quotesCategory: payload.id,
        quotesCategoryName: payload.name,
      });

    default:
      return state;
  }
};

export default globleAppReducer;
