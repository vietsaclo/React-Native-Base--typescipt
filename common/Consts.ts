import Env from './Env';

export const COLORS = {
  background_primary: '#fff',
  background_secondary: '#dcdcdc',

  text_primary: '#000',
  text_secondary: '#010101',
  text_white: '#fff',
  text_black: '#000',
}

export const CONFIG_BY_PLATFORM = {
    paddingTop: Env.IS_START_PLATFORM_IOS ? 30 : 0,
}
