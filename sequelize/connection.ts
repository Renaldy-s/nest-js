const { Sequelize } = require('sequelize');

const connection = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    pool: { max: 5 },
    logging: console.log,
    dialect: 'mysql',
    dialectOptions: {
      timezone: '+07:00',
      connectTimeout: 10000,
    },
  },
);

// const connection = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASS,
//   {
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     pool: { max: 5 },
//     logging: console.log,
//     dialect: 'postgres',
//     timezone: '+07:00',
//   },
// );

export const sequelize = connection;
