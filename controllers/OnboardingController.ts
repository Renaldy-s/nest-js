import { Request, Response } from 'express';
import * as Joi from 'joi';
import { CustomException } from '../exceptions/CustomException';
import { EXCEPTION_MESSAGE } from '../exceptions/EXCEPTION_MESSAGE';
import { ResponseHandler } from '../helpers/ResponseHandler';
import { onboardingService } from '../services/OnboardingService';

class OnboardingController {
  async getActivationStatus(req: Request, res: Response) {
    try {
      const validation = Joi.validate(
        req.body,
        {
          phoneNumber: Joi.string().required(),
        },
        {
          allowUnknown: true,
        },
      );
      if (!validation.error) {
        const data = await onboardingService.getActivationStatus(req.body);
        ResponseHandler.send(req, res, { data });
      } else {
        throw new CustomException(
          EXCEPTION_MESSAGE.MISSING_REQUIRED_DATA,
          validation.error.details,
        );
      }
    } catch (error) {
      ResponseHandler.send(req, res, error, true);
    }
  }

  async submitTransactionHistory(req: Request, res: Response) {
    try {
      const validation = Joi.validate(
        req.body,
        {
          phoneNumber: Joi.string().required(),
          storeName: Joi.string().required(),
          storeAddress: Joi.string().required(),
          branchId: Joi.string().guid().required(),
          firstTransaction: Joi.date().required(),
          transactions: Joi.array()
            .items(
              Joi.object().keys({
                yearPeriod: Joi.number().required(),
                monthPeriod: Joi.number().required(),
                totalAmountTransaction: Joi.number().required(),
                totalCountTransaction: Joi.number().required(),
              }),
            )
            .required(),
        },
        {
          allowUnknown: true,
        },
      );
      if (!validation.error) {
        const data = await onboardingService.submitTransactionHistory(req.body);
        ResponseHandler.send(req, res, { data });
      } else {
        throw new CustomException(
          EXCEPTION_MESSAGE.MISSING_REQUIRED_DATA,
          validation.error.details,
        );
      }
    } catch (error) {
      ResponseHandler.send(req, res, error, true);
    }
  }

  async submitPersonalData(req: Request, res: Response) {
    try {
      const validation = Joi.validate(
        req.body,
        {
          phoneNumber: Joi.string().required(),
          email: Joi.string().email().required(),
          branchId: Joi.string().required(),
          kyc: Joi.object()
            .keys({
              fullName: Joi.string().required(),
              NIK: Joi.number().required(),
              maritalStatus: Joi.string().required(),
              gender: Joi.string().required(),
              religion: Joi.string().required(),
              education: Joi.string().required(),
              maidenName: Joi.string().required(),
              placeOfBirth: Joi.string().required(),
              dateOfBirth: Joi.string().required(),
              address: Joi.string().required(),
              rt: Joi.string().required(),
              rw: Joi.string().required(),
              province: Joi.string().required(),
              city: Joi.string().required(),
              district: Joi.string().required(),
              subDistrict: Joi.string().required(),
              postalCode: Joi.string().required(),
            })
            .required(),
          domicile: Joi.object()
            .keys({
              address: Joi.string().required(),
              rt: Joi.string().required(),
              rw: Joi.string().required(),
              province: Joi.string().required(),
              city: Joi.string().required(),
              district: Joi.string().required(),
              subDistrict: Joi.string().required(),
              postalCode: Joi.string().required(),
              residenceStatus: Joi.string()
                .valid('MILIK_SENDIRI', 'MILIK_ORANG_TUA', 'SEWA')
                .required(),
            })
            .required(),
          store: Joi.object()
            .keys({
              address: Joi.string().required(),
              rt: Joi.string().required(),
              rw: Joi.string().required(),
              province: Joi.string().required(),
              city: Joi.string().required(),
              district: Joi.string().required(),
              subDistrict: Joi.string().required(),
              postalCode: Joi.string().required(),
              ownershipStatus: Joi.string().valid('PRIBADI', 'SEWA').required(),
              currentBusinessLength: Joi.string().required(),
              experienceBusinessLength: Joi.string().required(),
            })
            .required(),
        },
        {
          allowUnknown: true,
        },
      );
      if (!validation.error) {
        const data = await onboardingService.submitPersonalData(req.body);
        ResponseHandler.send(req, res, { data });
      } else {
        throw new CustomException(
          EXCEPTION_MESSAGE.MISSING_REQUIRED_DATA,
          validation.error.details,
        );
      }
    } catch (error) {
      ResponseHandler.send(req, res, error, true);
    }
  }

  async submitDocumentFile(req: Request, res: Response) {
    try {
      const validation = Joi.validate(
        req.body,
        {
          phoneNumber: Joi.string().required(),
          idCardPicture: Joi.string().required(),
          selfieIdCardPicture: Joi.string().required(),
        },
        {
          allowUnknown: true,
        },
      );
      if (!validation.error) {
        const data = await onboardingService.submitDocumentFile(req.body);
        ResponseHandler.send(req, res, { data });
      } else {
        throw new CustomException(
          EXCEPTION_MESSAGE.MISSING_REQUIRED_DATA,
          validation.error.details,
        );
      }
    } catch (error) {
      ResponseHandler.send(req, res, error, true);
    }
  }

  async requestActivationOTP(req: Request, res: Response) {
    try {
      const validation = Joi.validate(
        req.body,
        {
          phoneNumber: Joi.string().required(),
        },
        {
          allowUnknown: true,
        },
      );
      if (!validation.error) {
        const data = await onboardingService.requestActivationOTP(req.body);
        ResponseHandler.send(req, res, { data });
      } else {
        throw new CustomException(
          EXCEPTION_MESSAGE.MISSING_REQUIRED_DATA,
          validation.error.details,
        );
      }
    } catch (error) {
      ResponseHandler.send(req, res, error, true);
    }
  }

  async verifyActivationOTP(req: Request, res: Response) {
    try {
      const validation = Joi.validate(
        req.body,
        {
          phoneNumber: Joi.string().required(),
          otp: Joi.string().required(),
        },
        {
          allowUnknown: true,
        },
      );
      if (!validation.error) {
        const data = await onboardingService.verifyActivationOTP(req.body);
        ResponseHandler.send(req, res, { data });
      } else {
        throw new CustomException(
          EXCEPTION_MESSAGE.MISSING_REQUIRED_DATA,
          validation.error.details,
        );
      }
    } catch (error) {
      ResponseHandler.send(req, res, error, true);
    }
  }

  async getPaylaterPlafond(req: Request, res: Response) {
    try {
      const validation = Joi.validate(
        req.body,
        {
          phoneNumber: Joi.string().required(),
        },
        {
          allowUnknown: true,
        },
      );
      if (!validation.error) {
        const data = await onboardingService.getPaylaterPlafond(req.body);
        ResponseHandler.send(req, res, { data });
      } else {
        throw new CustomException(
          EXCEPTION_MESSAGE.MISSING_REQUIRED_DATA,
          validation.error.details,
        );
      }
    } catch (error) {
      ResponseHandler.send(req, res, error, true);
    }
  }
}

export const onboardingController = new OnboardingController();
