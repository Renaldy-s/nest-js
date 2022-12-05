const { Sequelize } = require('sequelize');

const connection = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    pool: { max: 5 },
    logging: `${process.env.NODE_ENV}` === 'production' ? false : console.log,
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
//     logging: `${process.env.NODE_ENV}` === 'production' ? false : console.log,
//     dialect: 'postgres',
//     dialectOptions: { application_name: process.env.SERVICE_NAME },
//     timezone: '+07:00',
//   },
// );

export const sequelize = connection;
