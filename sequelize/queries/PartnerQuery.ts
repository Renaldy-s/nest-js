import { Partner } from '../models/Partner';
require('../models/associations/index');

class PartnerQuery {
  async findOneByClientIdClientSecret(clientId: string, clientSecret: string) {
    return await Partner.findOne({
      where: {
        clientId,
        clientSecret,
      },
    });
  }
}

export const partnerQuery = new PartnerQuery();
