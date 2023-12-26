import AsyncStorage from "@react-native-async-storage/async-storage";
import { LOCAL_STORAGE_KEYs } from "./Consts";
import { I_MusicFee, I_loggedInResponse } from "./Interfaces";

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

  static getCurrentTimeUTC(): string {
    const dateStr = this.toDateFormat(this.getCurrentDate(), true);
    const time = dateStr.split('T')[1];
    return time.substring(0, time.lastIndexOf('.')) + '.UTC';
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
      count++;
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
    const tikopNumber = await AsyncStorage.getItem(LOCAL_STORAGE_KEYs.TIKOP.TIKOP_NUMBER);
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

  static async saveUserLoggedInStorage(userLogged: I_loggedInResponse) {
    const userJson = JSON.stringify(userLogged);
    await this.saveStorageWithKey(LOCAL_STORAGE_KEYs.USER_LOGGED.JSON_DATA, userJson);
  }

  static async clearUserLoggedInStorage() {
    await this.saveStorageWithKey(LOCAL_STORAGE_KEYs.USER_LOGGED.JSON_DATA, JSON.stringify({}));
  }

  static async getUserLoggedInStorage(): Promise<I_loggedInResponse | null> {
    const userJson = await this.getStorageWithKey(LOCAL_STORAGE_KEYs.USER_LOGGED.JSON_DATA);
    if (!userJson) {
      return null;
    }
    const userObject = JSON.parse(userJson);
    if (!userObject.userId) {
      return null;
    }

    const result: I_loggedInResponse = {
      ...userObject
    };

    return result;
  }

  static getImageSource = (image?: any) => {
    return image ? image : { uri: 'https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200' };
  }

  static getIndexFirstMusicFree = (listMusic: I_MusicFee[]) => {
    for (let i = 0; i < listMusic.length; i++)
      if (!listMusic[i].isPro) return i;

    return -1;
  }

  static getNextIndexedMusic = (currentIndex: number, musicFile: string, listMusic: I_MusicFee[], forkClicked?: boolean, proBought?: boolean) => {
    if (forkClicked) {
      const indexFind = listMusic.findIndex((v) => v.musicFile === musicFile);
      if (!indexFind) return -1;
      return indexFind;
    }

    if (proBought) {
      const next = currentIndex + 1;
      return next > listMusic.length - 1 ? 0 : next;
    }

    for (let i = currentIndex + 1; i < listMusic.length; i++) {
      if (!listMusic[i].isPro) return i;
    }

    return this.getIndexFirstMusicFree(listMusic);
  }
}

export default Pubs;