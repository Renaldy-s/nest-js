import { tools } from './Tools';

export class PinjamModalHelper {
  static getUrl() {
    return process.env.PINJAM_MODAL_URL;
  }

  static getBasicKey() {
    const key = tools.base64Encode(
      `${process.env.PINJAM_MODAL_CLIENT_ID}:${process.env.PINJAM_MODAL_CLIENT_SECRET}`,
    );

    return `Basic ${key}`;
  }
}
