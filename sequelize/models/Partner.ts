import { DataTypes } from 'sequelize';
import { sequelize } from '../connection';

export const Partner = sequelize.define(
  'partner',
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    clientApp: {
      type: DataTypes.STRING,
    },
    clientName: {
      type: DataTypes.STRING,
    },
    clientId: {
      type: DataTypes.STRING,
    },
    clientSecret: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: 'partners',
    underscored: true,
    timestamps: true,
  },
);
