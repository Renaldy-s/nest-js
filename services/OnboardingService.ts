import { CustomException } from '../exceptions/CustomException';
import { EXCEPTION_MESSAGE } from '../exceptions/EXCEPTION_MESSAGE';
import { HttpHelper } from '../helpers/HttpHelper';
import { PinjamModalHelper } from '../helpers/PinjamModalHelper';
import { pmLogService } from './PMLogService';

class OnboardingService {
  async getActivationStatus(input: any) {
    const url = `${PinjamModalHelper.getUrl()}/activation/status`;
    const authorization = PinjamModalHelper.getBasicKey();

    const header = {
      Authorization: authorization,
      'Content-Type': 'application/json',
    };

    const body = {
      uniqueId: input.phoneNumber,
    };

    const { status, data } = await HttpHelper.request(url)
      .setHeader(header)
      .setBody(body)
      .post();

    await pmLogService.createLog({
      partnerId: input.partnerId,
      route: url,
      request: body,
      statusCode: status,
      response: data,
    });

    if (status === 200) {
      return data.data;
    } else {
      throw new CustomException(EXCEPTION_MESSAGE.UNPROCESSABLE_ENTITY, {
        message: data.error,
      });
    }
  }

  async submitTransactionHistory(input: any) {
    const url = `${PinjamModalHelper.getUrl()}/submission/data/transaction/history`;
    const authorization = PinjamModalHelper.getBasicKey();

    const header = {
      Authorization: authorization,
      'Content-Type': 'application/json',
    };

    const body = {
      uniqueId: input.phoneNumber,
      storePhone: input.phoneNumber,
      storeName: input.storeName,
      storeAddress: input.storeAddress,
      firstTransaction: input.firstTransaction,
      transactions: input.transactions,
    };

    const { status, data } = await HttpHelper.request(url)
      .setHeader(header)
      .setBody(body)
      .post();

    await pmLogService.createLog({
      partnerId: input.partnerId,
      route: url,
      request: body,
      statusCode: status,
      response: data,
    });

    if (status === 200) {
      return data.data;
    } else {
      throw new CustomException(EXCEPTION_MESSAGE.UNPROCESSABLE_ENTITY, {
        message: data.error,
      });
    }
  }

  async submitPersonalData(input: any) {}

  async submitDocumentFile(input: any) {}
}

export const onboardingService = new OnboardingService();
