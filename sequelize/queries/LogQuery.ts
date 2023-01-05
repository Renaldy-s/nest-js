import { Transaction } from 'sequelize';
import { Log } from '../models/Log';
require('../models/associations/index');

class LogQuery {
  async create(payload: any, transaction: Transaction) {
    return await Log.create(payload, { transaction });
  }
}

export const logQuery = new LogQuery();
