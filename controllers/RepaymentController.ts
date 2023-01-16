import { Request, Response } from 'express';
import * as Joi from 'joi';
import { CustomException } from '../exceptions/CustomException';
import { EXCEPTION_MESSAGE } from '../exceptions/EXCEPTION_MESSAGE';
import { ResponseHandler } from '../helpers/ResponseHandler';
import { repaymentService } from '../services/RepaymentService';

class RepaymentController {
  async onlineRepayment(req: Request, res: Response) {
    try {
      const validation = Joi.validate(
        req.body,
        {
          loanId: Joi.string().required(),
        },
        {
          allowUnknown: true,
        },
      );
      if (!validation.error) {
        const data = await repaymentService.onlineRepayment(req.body);
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

  async offlineRepayment(req: Request, res: Response) {
    try {
      const validation = Joi.validate(
        req.body,
        {
          loanId: Joi.string().required(),
          refNumber: Joi.string().required(),
          amountPayment: Joi.number().required(),
        },
        {
          allowUnknown: true,
        },
      );
      if (!validation.error) {
        const data = await repaymentService.offlineRepayment(req.body);
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

  async offlineRepaymentOTPRequest(req: Request, res: Response) {
    try {
      const validation = Joi.validate(
        req.body,
        {
          loanId: Joi.string().required(),
        },
        {
          allowUnknown: true,
        },
      );
      if (!validation.error) {
        const data = await repaymentService.offlineRepaymentOTPRequest(
          req.body,
        );
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

  async offlineRepaymentOTPVerify(req: Request, res: Response) {
    try {
      const validation = Joi.validate(
        req.body,
        {
          loanId: Joi.string().required(),
          otp: Joi.number().required(),
        },
        {
          allowUnknown: true,
        },
      );
      if (!validation.error) {
        const data = await repaymentService.offlineRepaymentOTPVerify(req.body);
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

export const repaymentController = new RepaymentController();
