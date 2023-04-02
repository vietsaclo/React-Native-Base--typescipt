import { I_tikopState } from "../common/Interfaces";
import Pubs from "../common/Pubs";

class TikopAction {
  static getCashEarn = (tikopReducer: I_tikopState): string => {
    if (!tikopReducer.currentDateWithdraw) return Pubs.VND.format(0);
    const spanNumber = Pubs.getDateSpan(tikopReducer.currentDateWithdraw, Pubs.toDateFormat(Pubs.getCurrentDate(), true));
    return Pubs.VND.format(spanNumber * tikopReducer.cashWithdraw);
  }

  static getCashRemaining = (tikopReducer: I_tikopState): string => {
    const cash = (tikopReducer.totalDate - tikopReducer.currentIndexWithdraw) * tikopReducer.cashWithdraw;
    return Pubs.VND.format(cash > 0 ? cash : 0);
  }

  static canWithdraw = (dateFull: string, isTextDisplay: boolean = false): boolean => {
    if (!dateFull) return false;
    const dateWithdraw = new Date(dateFull.split('T')[0]);
    const currentDate = new Date(Pubs.toDateFormat(new Date(), false));
    return isTextDisplay ? dateWithdraw < currentDate : dateWithdraw <= currentDate;
  }
}

export default TikopAction;
