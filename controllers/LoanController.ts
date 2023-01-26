import { Request, Response } from 'express';
import * as Joi from 'joi';
import { CustomException } from '../exceptions/CustomException';
import { EXCEPTION_MESSAGE } from '../exceptions/EXCEPTION_MESSAGE';
import { ResponseHandler } from '../helpers/ResponseHandler';
import { loanService } from '../services/LoanService';

class LoanController {
  async submitLoan(req: Request, res: Response) {
    try {
      const validation = Joi.validate(
        req.body,
        {
          phoneNumber: Joi.string().required(),
          branchId: Joi.string().guid().required(),
          loanAmount: Joi.number().required(),
          loanLength: Joi.number().required(),
          referenceNumber: Joi.string().required(),
          referenceDate: Joi.string().required(),
          storeName: Joi.string().required(),
        },
        {
          allowUnknown: true,
        },
      );
      if (!validation.error) {
        const data = await loanService.submitLoan(req.body);
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

  async processLoan(req: Request, res: Response) {
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
        const data = await loanService.processLoan(req.body);
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

  async getLoanHistory(req: Request, res: Response) {
    try {
      const validation = Joi.validate(
        req.body,
        {
          phoneNumber: Joi.string().required(),
          limit: Joi.number().allow('', null).optional(),
          offset: Joi.number().allow('', null).optional(),
        },
        {
          allowUnknown: true,
        },
      );
      if (!validation.error) {
        const data = await loanService.getLoanHistory(req.body);
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

  async getLoanStatus(req: Request, res: Response) {
    try {
      const validation = Joi.validate(
        req.body,
        {
          loanIds: Joi.array().required(),
        },
        {
          allowUnknown: true,
        },
      );
      if (!validation.error) {
        const data = await loanService.getLoanStatus(req.body);
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

export const loanController = new LoanController();
