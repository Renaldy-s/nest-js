import { Request, Response } from 'express';
import { ResponseHandler } from '../helpers/ResponseHandler';
import { callbackNotificationService } from '../services/CallbackNotificationService';
import * as Joi from 'joi';
import { CustomException } from '../exceptions/CustomException';
import { EXCEPTION_MESSAGE } from '../exceptions/EXCEPTION_MESSAGE';

class CallbackNotificationController {
  async callbackOnLoanActive(req: Request, res: Response) {
    try {
      const data = await callbackNotificationService.createCallback(
        req.body,
        'LOAN_ACTIVE',
      );
      ResponseHandler.send(req, res, { data });
    } catch (error) {
      ResponseHandler.send(req, res, error, true);
    }
  }

  async callbackOnRepayment(req: Request, res: Response) {
    try {
      const data = await callbackNotificationService.createCallback(
        req.body,
        'LOAN_REPAYMENT',
      );
      ResponseHandler.send(req, res, { data });
    } catch (error) {
      ResponseHandler.send(req, res, error, true);
    }
  }

  async getLoanActiveCallback(req: Request, res: Response) {
    try {
      const validationSchema = { loanId: Joi.string().required() };
      const validation = Joi.validate(req.params, validationSchema, {
        allowUnknown: true,
      });
      if (validation.error === null) {
        const data = await callbackNotificationService.findLoanActiveCallback(
          req.params,
        );
        ResponseHandler.send(req, res, { data });
      } else {
        throw new CustomException(
          EXCEPTION_MESSAGE.MISSING_REQUIRED_DATA,
          validation,
        );
      }
    } catch (error) {
      ResponseHandler.send(req, res, error, true);
    }
  }
}

export const callbackNotificationController =
  new CallbackNotificationController();
