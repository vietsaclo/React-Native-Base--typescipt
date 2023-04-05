import AsyncStorage from "@react-native-async-storage/async-storage";
import { LOCAL_STORAGE_KEYS } from "./Consts";

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

  static getCurrentDate = (): Date => {
    return new Date();
  }

  static toDateFormat = (date: Date, isFull: boolean = false): string => {
    try {
      if (isFull) {
        return date.toISOString();
      }
      return date.toISOString().split('T')[0];
    } catch (err) {
      return '';
    };
  }

  static toShortDate(date: string): string {
    if (!date) return '';
    return date.split('T')[0];
  }

  static getDateSpan = (fromDateString: string, toDateString: string): number => {
    const fromDate = new Date(fromDateString);
    const toDate = new Date(toDateString);

    let count = 0;
    // console.log({
    //   fromDate: this.toDateFormat(fromDate),
    //   toDate: this.toDateFormat(toDate),
    // });
    // console.log('\n');

    const MAX = 365 * 10;
    while (this.toDateFormat(fromDate) !== this.toDateFormat(toDate)) {
      count ++;
      // console.log({
      //   count,
      //   fromDate: this.toDateFormat(fromDate),
      //   toDate: this.toDateFormat(toDate),
      // });
      fromDate.setDate(fromDate.getDate() + 1);
      if (count > MAX) return MAX;
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

  static async getTikopNumberFromStorage() {
    const tikopNumber = await AsyncStorage.getItem(LOCAL_STORAGE_KEYS.TIKOP.TIKOP_NUMBER);
    return tikopNumber ? Number(tikopNumber) : 0;
  }

  static async saveTikopStorageWithKey(key: string, value: string) {
    const tikopNumber = await this.getTikopNumberFromStorage();
    await AsyncStorage.setItem(`${tikopNumber}_${key}`, value);
  }

  static async getTikopStorageWithKey(key: string) {
    const tikopNumber = await this.getTikopNumberFromStorage();
    return await AsyncStorage.getItem(`${tikopNumber}_${key}`);
  }
}

export default Pubs;
