import { Transaction } from 'sequelize';
import { HttpHelper } from '../helpers/HttpHelper';
import { PinjamModalHelper } from '../helpers/PinjamModalHelper';
import { sequelize } from '../sequelize/connection';
import { pmLogService } from './PMLogService';

class MasterService {
  async getMaritalStatus(input: any) {
    return sequelize.transaction(async (transaction: Transaction) => {
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

      return data.data;
    });
  }

  async getGender(input: any) {
    return sequelize.transaction(async (transaction: Transaction) => {
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

      return data.data;
    });
  }

  async getReligion(input: any) {
    return sequelize.transaction(async (transaction: Transaction) => {
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

      return data.data;
    });
  }

  async getEducation(input: any) {
    return sequelize.transaction(async (transaction: Transaction) => {
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

      return data.data;
    });
  }

  async getPostalCode(input: any) {
    return sequelize.transaction(async (transaction: Transaction) => {
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

      return data.data;
    });
  }
}

export const masterService = new MasterService();
