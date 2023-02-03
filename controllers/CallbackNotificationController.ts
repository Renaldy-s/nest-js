import { Request, Response } from 'express';
import { ResponseHandler } from '../helpers/ResponseHandler';
import { callbackNotificationService } from '../services/CallbackNotificationService';

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
}

export const callbackNotificationController =
  new CallbackNotificationController();
