import { PMLog } from '../PMLog';
import { Partner } from '../Partner';

Partner.hasMany(PMLog, { foreignKey: 'partnerId' });
PMLog.belongsTo(Partner, { foreignKey: 'partnerId' });
