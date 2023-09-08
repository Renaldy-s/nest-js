import { Transaction } from 'sequelize';
import { CallbackNotification } from '../models/CallbackNotification';
require('../models/associations/index');

class CallbackNotificationQuery {
  async create(payload: any, transaction: Transaction) {
    return await CallbackNotification.create(payload, { transaction });
  }

  async findByLoanId(loanId: string) {
    return await CallbackNotification.findOne({
      where: {
        type: 'LOAN_ACTIVE',
        loanId,
      },
    });
  }
}

export const callbackNotificationQuery = new CallbackNotificationQuery();
