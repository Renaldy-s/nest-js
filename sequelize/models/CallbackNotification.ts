import { DataTypes } from 'sequelize';
import { sequelize } from '../connection';

export const CallbackNotification = sequelize.define(
  'callbackNotification',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      autoIncrement: false,
      defaultValue: DataTypes.UUIDV4,
    },
    loanId: DataTypes.STRING,
    type: DataTypes.STRING,
    metaData: DataTypes.JSON,
  },
  {
    tableName: 'callback_notifications',
    underscored: true,
    timestamps: true,
  },
);
