import { Transaction } from 'sequelize';
import { sequelize } from '../sequelize/connection';
import { pmLogQuery } from '../sequelize/queries/PMLogQuery';

class PMLogService {
  async createLog(input: any) {
    return sequelize.transaction(async (transaction: Transaction) => {
      await pmLogQuery.create(input, transaction);
    });
  }
}

export const pmLogService = new PMLogService();
