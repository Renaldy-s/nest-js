import { DataTypes } from 'sequelize';
import { sequelize } from '../connection';

export const Log = sequelize.define(
  'log',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      autoIncrement: false,
    },
    partnerId: DataTypes.UUIDV4,
    request: DataTypes.JSON,
    response: DataTypes.JSON,
  },
  {
    tableName: 'logs',
    underscored: true,
    timestamps: true,
  },
);
