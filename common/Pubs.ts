import AsyncStorage from "@react-native-async-storage/async-storage";

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

  static toDateFormat = (date: Date): string => {
    return `${this.padToDigits(date.getDate())}-${this.padToDigits(date.getMonth())}-${this.padToDigits(date.getFullYear())}`;
  }

  static getDateSpan = (fromDateString: string, toDateString: string): number => {
    const fromStrs = fromDateString.split('-');
    const toStrs = toDateString.split('-');
    const fromDate = new Date(Number(fromStrs[2]), Number(fromStrs[1]), Number(fromStrs[0]));
    const toDate = new Date(Number(toStrs[2]), Number(toStrs[1]), Number(toStrs[0]));

    let count = 0;
    const currentDate = new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate());
    while (this.toDateFormat(currentDate) !== this.toDateFormat(toDate)) {
      count ++;
      currentDate.setDate(currentDate.getDate() + 1);
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
