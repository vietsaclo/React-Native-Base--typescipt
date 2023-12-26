import Env from './Env';

export const COLORS = {
  background_primary: '#fff',
  background_secondary: '#dcdcdc',
  background_third: '#8c8c8c',

  text_primary: '#000',
  text_secondary: '#fff',
  text_white: '#fff',
  text_black: '#000',

  border_primary: '#fff',
  border_secondary: '#878787',
}

export const CONFIG_BY_PLATFORM = {
  paddingTop: Env.IS_START_PLATFORM_IOS ? 50 : 0,
}

export const LOCAL_STORAGE_KEYs = {
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
    TOKEN: 'LOGIN:_TOKEN',
  },
  USER_LOGGED: {
    JSON_DATA: 'USER_LOGGED:_JSON_DATA',
  },
  SETTINGS: {
    QUOTES_THEME_URL: 'SETTINGS:_QUOTES_THEME_URL',
    QUOTES_THEME_ID: 'SETTINGS:_QUOTES_THEME_ID',
    QUOTES_CATEGORY_ID: 'SETTINGS:_QUOTES_CATEGORY_ID',
    QUOTES_CATEGORY_NAME: 'SETTINGS:_QUOTES_CATEGORY_NAME',
  },
}

export const APIs = {
  AUTH: {
    ROOT: '/auth',
    SOCIAL: '/auth/social',
  },
  USER: {
    ROOT: '/user',
    CHANGE_NAME: '/user/change-name',
    CHANGE_PASSWORD: '/user/change-password'
  },
  CATEGORY: {
    ROOT: '/music-category',
    THEMES: '/music-category/themes',
    QUOTES: '/music-category/quotes',
  },
  MUSIC: {
    ROOT: '/musics',
    NEWS: '/musics/news',
  },
  QUOTES: {
    ROOT: '/quotes',
  },
}

export const DIFFUZERS = {
  MODE: {
    TEXT2IMAGE: 'TEXT2IMAGE',
    IMAGE2IMAGE: 'IMAGE2IMAGE',
    IPAINTING: 'IPAINTING',
  }
}

export const SOCKET_EVENTS = {
  QUEUE_COUNT: 'SOC:_QUEUE_COUNT',
}

export const WEB_RCT_ACTION = {
  JOIN_CHAT: 'JOIN_CHAT',
  ADD_STREAM: 'ADD_STREAM',
  MY_STREAM: 'MY_STREAM',
  ADD_REMOTE_STREAM: 'ADD_REMOE_STREAM',

}

export const NAMES_DEFAULT = {
  QUOTES_DEFAULT_FIRST_LOAD: 'Essentials',
}