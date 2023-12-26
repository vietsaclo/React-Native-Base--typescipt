export interface I_tikopState {
  totalDate: number,
  cashWithdraw: number,
  currentIndexWithdraw: number,
  currentDateWithdraw: string,
  startDate: string,
  currentIndexTimoed: number,
}

export interface I_dateTime {
  year: number,
  month: number,
  day: number,
  hours: number,
  minutes: number,
  seconds: number,
}

export interface I_globalAppState {
  viewCurrentCount?: number,
  withdrawIndexCount?: number,
  tikopNumber?: number,
  loading?: boolean,
  loadingText?: string,
  isPurchase?: boolean,
  totalImageAssets?: number | undefined | null,
  showPopupBuyPro?: boolean,
  quotesTheme?: string,
  quotesCategory?: number,
  quotesCategoryName?: string,
}

export interface I_loggedInResponse {
  loggedInType: string | null;
  permissions: string[] | undefined,
  accessToken: string | undefined | null,
  name: string | null | undefined,
  userId: string | null | undefined,
  email: string | null | undefined,
  imageUrl: string | null | undefined,
  accessTokenFromBE?: string | undefined | null,
  userIdFromBE?: number | undefined | null,
}

export interface I_Vector2 {
  x: number | string,
  y: number | string,
}

export interface I_Layout {
  width: number | string,
  height: number | string,
  x?: number,
  y?: number,
}

export interface I_ApiRes {
  success: boolean,
  result?: any,
  message?: string,
  total?: number,
}

export interface I_DataText2Image {
  scheduler: string,
  prompt: string,
  negative_prompt: string,
}

export interface I_MusicState {
  isPlaying?: boolean;
  musicFile?: string;
  duration?: number;
  currentTime?: number;
  isPause?: boolean;
  musicName?: string;
  musicCategory?: string;
  initialedMusic?: boolean;
}

export interface I_MusicFee {
  musicFile: string;
  musicName: string;
  musicCate: string;
  isPro: boolean;
}

export interface I_IndexedMusicState {
  currentIndex?: number;
  listMusics?: I_MusicFee[];
}
