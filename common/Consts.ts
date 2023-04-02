import Env from './Env';

export const COLORS = {
  background_primary: '#fff',
  background_secondary: '#dcdcdc',
  background_third: '#8c8c8c',

  text_primary: '#000',
  text_secondary: '#010101',
  text_white: '#fff',
  text_black: '#000',
}

export const CONFIG_BY_PLATFORM = {
  paddingTop: Env.IS_START_PLATFORM_IOS ? 30 : 0,
}

export const LOCAL_STORAGE_KEYS = {
  TOTAL_DATE: 'TOTAL_DATE',
  CASH_WITHDRAW: 'CASH_WITHDRAW',
  CURRENT_INDEX_WITHDRAW: 'CURRENT_INDEX_WITHDRAW',
  CURRENT_DATE_WITHDRAW: 'CURRENT_DATE_WITHDRAW',
  START_DATE_TIKOP: 'START_DATE_TIKOP',
}
