import { Request, Response } from 'express';
import { ResponseHandler } from '../helpers/ResponseHandler';
import * as Joi from 'joi';
import { CustomException } from '../exceptions/CustomException';
import { EXCEPTION_MESSAGE } from '../exceptions/EXCEPTION_MESSAGE';
import { authService } from '../services/AuthService';

class AuthController {
  async getAccessKey(req: Request, res: Response) {
    try {
      const validationSchema = {
        key: Joi.string().required(),
        type: Joi.string().valid(['GRANT_ACCESS_KEY']).required(),
      };
      const validation = Joi.validate(req.body, validationSchema, {
        allowUnknown: true,
      });
      if (validation.error === null) {
        const accessKey = await authService.getAccessKey(req.body);
        ResponseHandler.send(req, res, { data: accessKey });
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

export const authController = new AuthController();
