import { CustomException } from '../exceptions/CustomException';
import { EXCEPTION_MESSAGE } from '../exceptions/EXCEPTION_MESSAGE';
import { HttpHelper } from '../helpers/HttpHelper';
import { PinjamModalHelper } from '../helpers/PinjamModalHelper';
import { pmLogService } from './PMLogService';

class LoanService {
  async submitLoan(input: any) {
    const url = `${PinjamModalHelper.getUrl()}/apply/submit/loan`;
    const authorization = PinjamModalHelper.getBasicKey();

    const header = {
      Authorization: authorization,
      'Content-Type': 'application/json',
    };

    const body = {
      uniqueId: input.phoneNumber,
      loanAmount: input.loanAmount,
      loanLength: input.loanLength,
      branchId: input.branchId,
      referenceNumber: input.referenceNumber,
      referenceDate: input.referenceDate,
      storeName: input.storeName,
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

  async processLoan(input: any) {
    const url = `${PinjamModalHelper.getUrl()}/apply/process/loan`;
    const authorization = PinjamModalHelper.getBasicKey();

    const header = {
      Authorization: authorization,
      'Content-Type': 'application/json',
    };

    const body = { loanId: input.loanId };

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

  async getLoanHistory(input: any) {
    const url = `${PinjamModalHelper.getUrl()}/apply/history/loan`;
    const authorization = PinjamModalHelper.getBasicKey();

    const header = {
      Authorization: authorization,
      'Content-Type': 'application/json',
    };

    const body = {
      uniqueId: input.phoneNumber,
      limit: input.limit,
      offset: input.offset,
    };

    const { status, data } = await HttpHelper.request(url)
      .setHeader(header)
      .setBody(body)
      .post();

    if (status === 200) {
      return data.data;
    } else {
      throw new CustomException(EXCEPTION_MESSAGE.UNPROCESSABLE_ENTITY, {
        message: data.error,
      });
    }
  }

  async getLoanStatus(input: any) {
    const url = `${PinjamModalHelper.getUrl()}/apply/status/loan`;
    const authorization = PinjamModalHelper.getBasicKey();

    const header = {
      Authorization: authorization,
      'Content-Type': 'application/json',
    };

    const body = {
      loanIds: input.loanIds,
    };

    const { status, data } = await HttpHelper.request(url)
      .setHeader(header)
      .setBody(body)
      .post();

    if (status === 200) {
      return data.data;
    } else {
      throw new CustomException(EXCEPTION_MESSAGE.UNPROCESSABLE_ENTITY, {
        message: data.error,
      });
    }
  }
}

export const loanService = new LoanService();
