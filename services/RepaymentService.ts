import { CustomException } from '../exceptions/CustomException';
import { EXCEPTION_MESSAGE } from '../exceptions/EXCEPTION_MESSAGE';
import { HttpHelper } from '../helpers/HttpHelper';
import { PinjamModalHelper } from '../helpers/PinjamModalHelper';
import { pmLogService } from './PMLogService';

class RepaymentService {
  async onlineRepayment(input: any) {
    const url = `${PinjamModalHelper.getUrl()}/payment/generate/link`;
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

  async offlineRepayment(input: any) {
    const url = `${PinjamModalHelper.getUrl()}/payment/manual/add`;
    const authorization = PinjamModalHelper.getBasicKey();

    const header = {
      Authorization: authorization,
      'Content-Type': 'application/json',
    };

    const body = {
      loanId: input.loanId,
      referenceNumber: input.refNumber,
      amountPayment: input.amountPayment,
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

  async offlineRepaymentOTPRequest(input: any) {
    const url = `${PinjamModalHelper.getUrl()}/payment/manual/otp/request`;
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

  async offlineRepaymentOTPVerify(input: any) {
    const url = `${PinjamModalHelper.getUrl()}/payment/manual/otp/verify`;
    const authorization = PinjamModalHelper.getBasicKey();

    const header = {
      Authorization: authorization,
      'Content-Type': 'application/json',
    };

    const body = { loanId: input.loanId, otpNumber: input.otp };

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

  async cashRepayment(input: any) {
    const url = `${PinjamModalHelper.getUrl()}/payment/cash`;
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
}

export const repaymentService = new RepaymentService();
