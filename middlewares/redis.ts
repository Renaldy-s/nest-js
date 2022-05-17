/* eslint-disable prefer-promise-reject-errors */
const redis = require('redis');
const CryptoJS = require('crypto-js');
var client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

const REDIS_CRYPT = CryptoJS.AES.decrypt(
  process.env.REDIS_CRYPT.toString(),
  'GROSIRONE',
).toString(CryptoJS.enc.Utf8);

client.on('connect', () => {
  client.auth(REDIS_CRYPT);
});
client.on('error', function (err: any) {
  console.log('Redis Error:', err);
});

export default class RedisController {
  updateValue(key: string, value: any, ttl: any) {
    return new Promise((resolve, reject) => {
      client.hmset(key, value, function (err: any, result: any) {
        if (err) {
          console.log('updateValue', err);
          reject(err);
        } else {
          client.expire(key, ttl);
          resolve(result);
        }
      });
    });
  }

  publishAll(name: string) {
    return new Promise((resolve, reject) => {
      client.hgetall(name, (err: any, reply: any) => {
        if (err) {
          console.log('publishAll', err);
          reject({});
        } else if (reply === null) {
          reject({});
        } else {
          resolve(reply);
        }
      });
    });
  }

  set(key: string, value: any) {
    client.set(key, value);
  }

  get(key: string): Promise<string> {
    return new Promise((resolve, reject) => {
      client.get(key, (err, val) => {
        if (err) {
          reject(err);
        }
        if (val === null) {
          resolve(null);
          return;
        }

        resolve(val);
      });
    });
  }
}
