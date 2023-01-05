import { Log } from '../Log';
import { Partner } from '../Partner';

Partner.hasMany(Log, { foreignKey: 'partnerId' });
Log.belongsTo(Partner, { foreignKey: 'partnerId' });
