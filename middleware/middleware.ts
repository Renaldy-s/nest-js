// eslint-disable-next-line no-unused-vars
import { Request, Response, NextFunction } from 'express';
import { verifyToken } from './jwt';
import { ResponseHandler } from '../helpers/ResponseHandler';
import { LEVEL, EXCEPTION_MESSAGE } from '../exceptions/EXCEPTION_MESSAGE';
import logger from '../helpers/Logger';
import { v4 as uuidv4 } from 'uuid';
import { CustomException } from '../exceptions/CustomException';

export async function serviceMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const traceId: string = uuidv4();
  if (!req.body.traceId) req.body.traceId = traceId;
  const message: string = JSON.stringify({
    headers: req.headers,
    body: req.body,
  });
  logger.log(LEVEL.INFO, 'REQUEST_DATA', {
    traceId: traceId,
    statusCode: null,
    message: message,
  });
  checkAuthentication(req, res, next);
}

async function checkAuthentication(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    if (
      req.headers.authorization !== undefined &&
      req.headers.authorization !== ''
    ) {
      const authObj: any = req.headers.authorization.split(' ');
      if (authObj[0] !== 'Bearer') {
        throw new CustomException(EXCEPTION_MESSAGE.NOT_AUTHORIZED, {
          message: 'Invalid credential key',
        });
      } else {
        const verify = verifyToken(authObj[1]);
        if (verify == 'expired') {
          throw new CustomException(EXCEPTION_MESSAGE.SESSION_EXPIRED, verify);
        } else if (verify == 'error') {
          throw new CustomException(EXCEPTION_MESSAGE.NOT_AUTHORIZED, verify);
        } else {
          req.body.partnerId = verify.accessToken.id;
          req.body.partnerApp = verify.accessToken.clientApp;
          req.body.partnerName = verify.accessToken.clientName;
          next();
        }
      }
    } else {
      throw new CustomException(EXCEPTION_MESSAGE.NOT_AUTHORIZED);
    }
  } catch (e) {
    if (e instanceof CustomException) {
      if (e.obj.code >= 500) {
        logger.log(LEVEL.ERROR, '[ERROR]', {
          traceId: req.body.traceId,
          statusCode: null,
          message: e,
        });
      }
    } else {
      logger.log(LEVEL.ERROR, '[ERROR]', {
        traceId: req.body.traceId,
        statusCode: null,
        message: e,
      });
    }
    ResponseHandler.send(req, res, e, true);
  }
}
