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
}

export interface I_loggedInResponse {
  loggedInType: string | null;
  permissions: string[] | undefined,
  accessToken: string | undefined | null,
  name: string | null | undefined,
  userId: string | null | undefined,
  email: string | null | undefined,
  imageUrl: string | null | undefined,
}
