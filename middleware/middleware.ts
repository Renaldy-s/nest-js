// eslint-disable-next-line no-unused-vars
import { Request, Response, NextFunction } from 'express';
import { verifyToken } from './jwt';
import Redis from './redis';
import { ResponseHandler } from '../helpers/ResponseHandler';
import { LEVEL, EXCEPTION_MESSAGE } from '../exceptions/EXCEPTION_MESSAGE';
import logger from '../helpers/Logger';
import { v4 as uuidv4 } from 'uuid';
import { tools } from '../helpers/Tools';
import { CustomException } from '../exceptions/CustomException';

export async function serviceMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  // add trace id to body if not exist
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
      const verify = verifyToken(req.headers.authorization);
      if (verify == 'expired') {
        throw new CustomException(EXCEPTION_MESSAGE.SESSION_EXPIRED, verify);
      } else if (verify == 'error') {
        throw new CustomException(EXCEPTION_MESSAGE.NOT_AUTHORIZED, verify);
      }
      const arrayToken = JSON.parse(verify.accessToken);
      const redisSession = new Redis();
      const keyToken =
        'TEMPLATE-' +
        tools.sha256(`${arrayToken.clientId}-${arrayToken.clientSecret}`);
      const resultUserToken: any = await redisSession.get(keyToken);
      if (!resultUserToken) {
        throw new CustomException(
          EXCEPTION_MESSAGE.REDIS_EXPIRED,
          resultUserToken,
        );
      } else {
        const userParam = JSON.parse(resultUserToken);
        req.body.userId = userParam.id;
        next();
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
