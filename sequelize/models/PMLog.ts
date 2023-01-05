import { DataTypes } from 'sequelize';
import { sequelize } from '../connection';

export const PMLog = sequelize.define(
  'PMLog',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      autoIncrement: false,
    },
    route: DataTypes.STRING,
    partnerId: DataTypes.UUIDV4,
    request: DataTypes.JSON,
    response: DataTypes.JSON,
  },
  {
    tableName: 'pm_logs',
    underscored: true,
    timestamps: true,
  },
);
