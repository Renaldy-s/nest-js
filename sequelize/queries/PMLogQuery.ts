import { Transaction } from 'sequelize';
import { PMLog } from '../models/PMLog';
require('../models/associations/index');

class PMLogQuery {
  async create(payload: any, transaction: Transaction) {
    return await PMLog.create(payload, { transaction });
  }
}

export const pmLogQuery = new PMLogQuery();
