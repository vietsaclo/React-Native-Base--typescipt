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
    return date.toISOString().split('T')[0];
  }

  static getDateSpan = (fromDateString: string, toDateString: string): number => {
    const fromDate = new Date(fromDateString);
    const toDate = new Date(toDateString);

    let count = 0;
    console.log({
      fromDate: this.toDateFormat(fromDate),
      toDate: this.toDateFormat(toDate),
    });
    console.log('\n');
    
    
    while (this.toDateFormat(fromDate) !== this.toDateFormat(toDate)) {
      count ++;
      console.log({
        count,
        fromDate: this.toDateFormat(fromDate),
        toDate: this.toDateFormat(toDate),
      });
      
      fromDate.setDate(fromDate.getDate() + 1);
      if (count > 5) return 5;
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
