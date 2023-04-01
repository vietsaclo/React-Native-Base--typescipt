class Pubs {
  static padToDigits(number: number, numFormat: number = 2) {
    return number.toString().padStart(numFormat, '0');
  }

  static toDateFormat = (date: Date): string => {
    return `${this.padToDigits(date.getDate())}-${this.padToDigits(date.getMonth())}-${this.padToDigits(date.getFullYear())}`;
  }
}

export default Pubs;
