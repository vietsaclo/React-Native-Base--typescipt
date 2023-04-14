import Env from './Env';

export const COLORS = {
  background_primary: '#212326',
  background_secondary: '#000',
  background_third: '#ffc035',

  text_primary: '#ffc035',
  text_secondary: '#fff',
  text_white: '#fff',
  text_black: '#000',

  border_primary: '#fff',
  border_secondary: '#878787',
}

export const CONFIG_BY_PLATFORM = {
  paddingTop: Env.IS_START_PLATFORM_IOS ? 50 : 0,
}

export const LOCAL_STORAGE_KEYS = {
  TIKOP: {
    TOTAL_DATE: 'TIKOP_TOTAL_DATE',
    CASH_WITHDRAW: 'TIKOP_CASH_WITHDRAW',
    CURRENT_INDEX_WITHDRAW: 'TIKOP_CURRENT_INDEX_WITHDRAW',
    CURRENT_DATE_WITHDRAW: 'TIKOP_CURRENT_DATE_WITHDRAW',
    START_DATE_TIKOP: 'TIKOP_START_DATE_TIKOP',
    TIKOP_NUMBER: 'TIKOP_TIKOP_NUMBER',
    CURRENT_INDEX_TIMOED: 'TIKOP_CURRENT_INDEX_TIMOED',
  },
  LOGIN: {
    TYPE: 'LOGIN:_TYPE',
    TYPE_FACEBOOK: 'LOGIN:_TYPE_FACEBOOK',
    TYPE_GOOGLE: 'LOGIN:_TYPE_GOOGLE',
    TYPE_APPLE: 'LOGIN:_TYPE_APPLE',
  },
  USER_LOGGED: {
    JSON_DATA: 'USER_LOGGED:_JSON_DATA',
  },
}
