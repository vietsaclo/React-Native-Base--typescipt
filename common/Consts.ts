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
  TIKOP: {
    TOTAL_DATE: 'TIKOP_TOTAL_DATE',
    CASH_WITHDRAW: 'TIKOP_CASH_WITHDRAW',
    CURRENT_INDEX_WITHDRAW: 'TIKOP_CURRENT_INDEX_WITHDRAW',
    CURRENT_DATE_WITHDRAW: 'TIKOP_CURRENT_DATE_WITHDRAW',
    START_DATE_TIKOP: 'TIKOP_START_DATE_TIKOP',
    TIKOP_NUMBER: 'TIKOP_TIKOP_NUMBER',
  }
}
