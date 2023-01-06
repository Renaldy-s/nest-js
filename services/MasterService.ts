import { CustomException } from '../exceptions/CustomException';
import { EXCEPTION_MESSAGE } from '../exceptions/EXCEPTION_MESSAGE';
import { HttpHelper } from '../helpers/HttpHelper';
import { PinjamModalHelper } from '../helpers/PinjamModalHelper';
import { pmLogService } from './PMLogService';

class MasterService {
  async getMaritalStatus(input: any) {
    const url = `${PinjamModalHelper.getUrl()}/master/marital/status`;
    const authorization = PinjamModalHelper.getBasicKey();
    const header = {
      Authorization: authorization,
      'Content-Type': 'application/json',
    };

    const { status, data } = await HttpHelper.request(url)
      .setHeader(header)
      .post();

    await pmLogService.createLog({
      partnerId: input.partnerId,
      route: url,
      request: {},
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

  async getGender(input: any) {
    const url = `${PinjamModalHelper.getUrl()}/master/gender`;
    const authorization = PinjamModalHelper.getBasicKey();
    const header = {
      Authorization: authorization,
      'Content-Type': 'application/json',
    };

    const { status, data } = await HttpHelper.request(url)
      .setHeader(header)
      .post();

    await pmLogService.createLog({
      partnerId: input.partnerId,
      route: url,
      request: {},
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

  async getReligion(input: any) {
    const url = `${PinjamModalHelper.getUrl()}/master/religion`;
    const authorization = PinjamModalHelper.getBasicKey();
    const header = {
      Authorization: authorization,
      'Content-Type': 'application/json',
    };

    const { status, data } = await HttpHelper.request(url)
      .setHeader(header)
      .post();

    await pmLogService.createLog({
      partnerId: input.partnerId,
      route: url,
      request: {},
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

  async getEducation(input: any) {
    const url = `${PinjamModalHelper.getUrl()}/master/education`;
    const authorization = PinjamModalHelper.getBasicKey();
    const header = {
      Authorization: authorization,
      'Content-Type': 'application/json',
    };

    const { status, data } = await HttpHelper.request(url)
      .setHeader(header)
      .post();

    await pmLogService.createLog({
      partnerId: input.partnerId,
      route: url,
      request: {},
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

  async getPostalCode(input: any) {
    const url = `${PinjamModalHelper.getUrl()}/master/indonesia/area`;
    const authorization = PinjamModalHelper.getBasicKey();
    const header = {
      Authorization: authorization,
      'Content-Type': 'application/json',
    };
    const body = {
      province: input.province,
      city: input.city,
      district: input.district,
      subDistrict: input.subDistrict,
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

  async getBusinessLength(input: any) {
    const url = `${PinjamModalHelper.getUrl()}/master/business/length`;
    const authorization = PinjamModalHelper.getBasicKey();
    const header = {
      Authorization: authorization,
      'Content-Type': 'application/json',
    };

    const { status, data } = await HttpHelper.request(url)
      .setHeader(header)
      .post();

    await pmLogService.createLog({
      partnerId: input.partnerId,
      route: url,
      request: {},
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

export const masterService = new MasterService();
