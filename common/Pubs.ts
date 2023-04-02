import AsyncStorage from "@react-native-async-storage/async-storage";
import { I_dateTime } from "./Interfaces";
import moment from "moment";

class Pubs {
  static async saveStorageWithKey(key: string, value: string) {
    await AsyncStorage.setItem(key, value);
  }
  
  static async getStorageWithKey(key: string) {
    return await AsyncStorage.getItem(key);
  }

  static padToDigits(number: number, numFormat: number = 2) {
    return number.toString().padStart(numFormat, '0');
  }

  static getCurrentDate = (current: any = null): I_dateTime => {
    if (!current)
      current = moment();
    const result: I_dateTime = {
      year: current.year(),
      month: current.month(),
      day: current.date(),
      hours: current.hours(),
      minutes: current.minutes(),
      seconds: current.seconds(),
    };

    return result;
  }

  static toDateFormat = (date: I_dateTime): string => {
    return `${this.padToDigits(date.day)}-${this.padToDigits(date.month)}-${this.padToDigits(date.year)}`;
  }

  static getDateSpan = (fromDateString: string, toDateString: string): number => {
    const fromDate = moment(fromDateString, 'DD-MM-YYYY');
    const toDate = moment(toDateString, 'DD-MM-YYYY');

    console.log({fromDateString, toDateString});
    let count = 0;
    
    while (this.toDateFormat(this.getCurrentDate(fromDate)) !== this.toDateFormat(this.getCurrentDate(toDate))) {
      count ++;
      console.log({count, cur: this.toDateFormat(this.getCurrentDate(fromDate)), toDate: this.toDateFormat(this.getCurrentDate(toDate))});
      
      fromDate.add(1, 'days');
    }

    return count;
  }

  static USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  static VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
}

export default Pubs;
