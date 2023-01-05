import { DataTypes } from 'sequelize';
import { sequelize } from '../connection';

export const Partner = sequelize.define(
  'partner',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      autoIncrement: false,
      defaultValue: DataTypes.UUIDV4,
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
