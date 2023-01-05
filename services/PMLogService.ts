import { Transaction } from 'sequelize';
import { CustomException } from '../exceptions/CustomException';
import { EXCEPTION_MESSAGE } from '../exceptions/EXCEPTION_MESSAGE';
import { ResponseHandler } from '../helpers/ResponseHandler';
import { sequelize } from '../sequelize/connection';
import { pmLogQuery } from '../sequelize/queries/PMLogQuery';

class PMLogService {
  async createLog(input: any) {
    return sequelize.transaction(async (transaction: Transaction) => {
      const createLog = await pmLogQuery.create(input, transaction);
      if (!createLog) {
        throw new CustomException(EXCEPTION_MESSAGE.UNPROCESSABLE_ENTITY, {
          message: 'Create pm log failed.',
        });
      }
    });
  }
}

export const pmLogService = new PMLogService();
