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

  async submitPersonalData(req: Request, res: Response) {}

  async submitDocumentFile(req: Request, res: Response) {}
}

export const onboardingController = new OnboardingController();
