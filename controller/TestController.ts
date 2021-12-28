import { Request, Response } from 'express';
import { TestService } from '../service/TestService';
import { ResponseHandler } from '../helper/ResponseHandler';
import { EXCEPTION_MESSAGE } from '../exception/EXCEPTION_MESSAGE';
import { CustomException } from '../exception/CustomException';
import * as Joi from 'joi';

export class TestController {
  async getTestResponse (req: Request, res: Response): Promise<void> {
    try {
      const validationSchema: any = {
        parameter: Joi.string().allow(null).required(),
        trace_id: Joi.string().required()
      };

      console.log("req.body", req.body);

      const validation: any = Joi.validate(req.body, validationSchema);
      if (validation.error === null) {
        const result = await TestService.getTestResult(req.body);

        ResponseHandler.send(req, res, { data: result });
      } else {
        throw new CustomException(EXCEPTION_MESSAGE.MISSING_REQUIRED_DATA, validation);
      }
    } catch (error) {
      ResponseHandler.send(req, res, error, true);
    }
  }
}

export const testController = new TestController();
