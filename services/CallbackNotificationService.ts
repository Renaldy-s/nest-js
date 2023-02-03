import { Transaction } from 'sequelize';
import { CustomException } from '../exceptions/CustomException';
import { EXCEPTION_MESSAGE } from '../exceptions/EXCEPTION_MESSAGE';
import { sequelize } from '../sequelize/connection';
import { callbackNotificationQuery } from '../sequelize/queries/CallbackNotification';

class CallbackNotificationService {
  async createCallback(input: any, type: any) {
    return sequelize.transaction(async (transaction: Transaction) => {
      const data = {
        loanId: input.id,
        type,
        metaData: input,
      };
      const callback = await callbackNotificationQuery.create(
        data,
        transaction,
      );
      if (!callback) {
        throw new CustomException(EXCEPTION_MESSAGE.PROCESSING_ERROR);
      } else {
        return;
      }
    });
  }
}

export const callbackNotificationService = new CallbackNotificationService();
