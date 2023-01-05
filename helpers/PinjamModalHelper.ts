import { tools } from './Tools';

export class PinjamModalHelper {
  getUrl() {
    return process.env.PINJAM_MODAL_URL;
  }

  getBasicKey() {
    const key = tools.base64Encode(
      `${process.env.PINJAM_MODAL_CLIENT_ID}:${process.env.PINJAM_MODAL_CLIENT_SECRET}`,
    );

    return `Basic ${key}`;
  }
}
