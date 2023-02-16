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

  async submitPersonalData(input: any) {
    const url = `${PinjamModalHelper.getUrl()}/submission/data/personal`;
    const authorization = PinjamModalHelper.getBasicKey();

    const header = {
      Authorization: authorization,
      'Content-Type': 'application/json',
    };

    const body = {
      uniqueId: input.phoneNumber,
      mobileNumber: input.phoneNumber,
      emailAddress: input.email,
      identificationData: {
        fullName: input.kyc.fullName,
        identificationNumber: input.kyc.NIK,
        maritalStatus: input.kyc.maritalStatus,
        gender: input.kyc.gender,
        religion: input.kyc.religion,
        education: input.kyc.education,
        maidenName: input.kyc.maidenName,
        placeOfBirth: input.kyc.placeOfBirth,
        dateOfBirth: input.kyc.dateOfBirth,
        address: input.kyc.address,
        rt: input.kyc.rt,
        rw: input.kyc.rw,
        province: input.kyc.province,
        city: input.kyc.city,
        district: input.kyc.district,
        subDistrict: input.kyc.subDistrict,
        postalCode: input.kyc.postalCode,
      },
      domicileAddress: {
        address: input.domicile.address,
        rt: input.domicile.rt,
        rw: input.domicile.rw,
        province: input.domicile.province,
        city: input.domicile.city,
        district: input.domicile.district,
        subDistrict: input.domicile.subDistrict,
        postalCode: input.domicile.postalCode,
        residenceStatus: input.domicile.residenceStatus,
      },
      storeAddress: {
        address: input.store.address,
        rt: input.store.rt,
        rw: input.store.rw,
        province: input.store.province,
        city: input.store.city,
        district: input.store.district,
        subDistrict: input.store.subDistrict,
        postalCode: input.store.postalCode,
        ownershipStatus: input.store.ownershipStatus,
        currentBusinessLength: input.store.currentBusinessLength,
        experienceBusinessLength: input.store.experienceBusinessLength,
      },
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

  async submitDocumentFile(input: any) {
    const url = `${PinjamModalHelper.getUrl()}/submission/data/document/base64`;
    const authorization = PinjamModalHelper.getBasicKey();

    const header = {
      Authorization: authorization,
      'Content-Type': 'application/json',
    };

    const body = {
      uniqueId: input.phoneNumber,
      idCardPicture: input.idCardPicture,
      selfieIdCardPicture: input.selfieIdCardPicture,
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

  async requestActivationOTP(input: any) {
    const url = `${PinjamModalHelper.getUrl()}/activation/privy/request`;
    const authorization = PinjamModalHelper.getBasicKey();

    const header = {
      Authorization: authorization,
      'Content-Type': 'application/json',
    };

    const body = { uniqueId: input.phoneNumber };

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

  async verifyActivationOTP(input: any) {
    const url = `${PinjamModalHelper.getUrl()}/activation/privy/verify`;
    const authorization = PinjamModalHelper.getBasicKey();

    const header = {
      Authorization: authorization,
      'Content-Type': 'application/json',
    };

    const body = { uniqueId: input.phoneNumber, otpNumber: input.otp };

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

  async getPaylaterPlafond(input: any) {
    const url = `${PinjamModalHelper.getUrl()}/activation/plafond`;
    const authorization = PinjamModalHelper.getBasicKey();

    const header = {
      Authorization: authorization,
      'Content-Type': 'application/json',
    };

    const body = { uniqueId: input.phoneNumber };

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

export const onboardingService = new OnboardingService();
