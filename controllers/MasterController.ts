import { Request, Response } from 'express';
import { ResponseHandler } from '../helpers/ResponseHandler';
import { masterService } from '../services/MasterService';

class MasterController {
  async getMaritalStatus(req: Request, res: Response) {
    try {
      const data = await masterService.getMaritalStatus(req.body);
      ResponseHandler.send(req, res, { data });
    } catch (error) {
      ResponseHandler.send(req, res, error, true);
    }
  }

  async getGender(req: Request, res: Response) {
    try {
      const data = await masterService.getGender(req.body);
      ResponseHandler.send(req, res, { data });
    } catch (error) {
      ResponseHandler.send(req, res, error, true);
    }
  }

  async getReligion(req: Request, res: Response) {
    try {
      const data = await masterService.getReligion(req.body);
      ResponseHandler.send(req, res, { data });
    } catch (error) {
      ResponseHandler.send(req, res, error, true);
    }
  }

  async getEducation(req: Request, res: Response) {
    try {
      const data = await masterService.getEducation(req.body);
      ResponseHandler.send(req, res, { data });
    } catch (error) {
      ResponseHandler.send(req, res, error, true);
    }
  }

  async getPostalCode(req: Request, res: Response) {
    try {
      const data = await masterService.getPostalCode(req.body);
      ResponseHandler.send(req, res, { data });
    } catch (error) {
      ResponseHandler.send(req, res, error, true);
    }
  }

  async getBusinessLength(req: Request, res: Response) {
    try {
      const data = await masterService.getBusinessLength(req.body);
      ResponseHandler.send(req, res, { data });
    } catch (error) {
      ResponseHandler.send(req, res, error, true);
    }
  }
}

export const masterController = new MasterController();
