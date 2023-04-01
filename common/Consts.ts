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
