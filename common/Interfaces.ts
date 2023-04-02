export interface I_tikopState {
  totalDate: number,
  cashWithdraw: number,
  currentIndexWithdraw: number,
  currentDateWithdraw: string,
  startDate: string,
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
}
