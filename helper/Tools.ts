import * as _ from 'lodash';
const CryptoJS = require('crypto-js');

export interface passwordObject {
  password: string,
  salt: string
}

class Tools {
  public static generatePassword (email: string, password: string): passwordObject {
    const salt = CryptoJS.SHA256(email).toString();
    const crypt = CryptoJS.PBKDF2(password, salt, { keySize: 256 / 32 }).toString();

    return { password: crypt, salt: salt };
  }

  public static base64(value: string) {
    return CryptoJS.SHA256(value).toString();
  }

  public static hashPassword (password: string, salt: string): string {
    return CryptoJS.PBKDF2(password, salt, { keySize: 256 / 32 }).toString();
  }

  public static getRandomString (length: number): string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  public static getRandomInt (min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  public static getRandomFloat (min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  public static getRandomBool (): boolean {
    return Math.random() >= 0.5;
  }

  public static toSnakeCase (payload: any): any {
    let data = _.cloneDeep(payload);
    _.each(_.keys(data), key => {
      const camelCaseKey = _.snakeCase(key);
      const value = _.get(data, key);

      if (_.isObject(value)) {
        data[camelCaseKey] = Tools.toSnakeCase(value);
      } else {
        data[camelCaseKey] = value;
      }

      if (camelCaseKey !== key) {
        data = _.omit(data, key);
      }
    });

    return data;
  }

  public static toCamelCase (payload: any): any {
    let data = _.cloneDeep(payload);
    _.each(_.keys(data), key => {
      const camelCaseKey = _.camelCase(key);
      const value = _.get(data, key);

      if (_.isObject(value)) {
        data[camelCaseKey] = Tools.toCamelCase(value);
      } else {
        data[camelCaseKey] = value;
      }

      if (camelCaseKey !== key) {
        data = _.omit(data, key);
      }
    });

    return data;
  }

  public static toUpperCase (payload: any): any {
    let data = _.cloneDeep(payload);
    _.each(_.keys(data), key => {
      const camelCaseKey = _.chain(key).upperCase().replace(' ', '_').value();
      const value = _.get(data, key);

      if (_.isObject(value)) {
        data[camelCaseKey] = Tools.toUpperCase(value);
      } else {
        data[camelCaseKey] = value;
      }

      if (camelCaseKey !== key) {
        data = _.omit(data, key);
      }
    });

    return data;
  }

  public static toFloat(payload: any): number {
    return parseFloat(payload.toString())
  }

  public static thousandSeparator(x : any, isCurrency : boolean = true) : string {
    try {
      let dec = x.toString().split('.');
      let len = dec && dec.length > 2 ? dec.length : 2
      let num = Number(x).toFixed(len);
      let parts = num.split(',');
      if(isCurrency)
        parts[0] = 'Rp ' + parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      else
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      return parts.join(',');
    } catch (e) {
      return null;
    }
  }

  public static addZeroes(num : string) {
    const dec = num.split('.')[1]
    const len = dec && dec.length > 2 ? dec.length : 2
    return Number(num).toFixed(len)
  }
}

export const tools = Tools;