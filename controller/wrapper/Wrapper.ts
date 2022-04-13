import { Request, Response } from 'express';
import { CustomException } from '../../exception/CustomException';
import { ResponseHandler } from '../../helper/ResponseHandler';
import { tools } from '../../helper/Tools';
import logger from '../../helper/Logger';
import { LEVEL } from '../../exception/EXCEPTION_MESSAGE';

export const wrapper = function(req: Request, res: Response, func: any){
  const args = Array.prototype.slice.call(arguments)[0];

  return func.apply(this, args)
    .then(async(result)=>{
      const responsePayload = tools.toCamelCase(JSON.parse(JSON.stringify(result)));

      return ResponseHandler.send(req, res, responsePayload);
    })
    .catch(error=>{
      if (error instanceof CustomException) {
        if (error.obj.code >= 500) {
          logger.log(LEVEL.ERROR, '[ERROR]', {
            traceId: req.body.traceId,
            statusCode: null,
            message: error
          });
        }
      } else {
        logger.log(LEVEL.ERROR, '[ERROR]', {
          traceId: req.body.traceId,
          statusCode: null,
          message: error
        });
      }

      ResponseHandler.send(req, res, error, true);
    })
}