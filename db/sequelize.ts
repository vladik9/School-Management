import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(`mysql://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@localhost:3306/${process.env.DB_DATABASE}`, {
  dialect: 'mysql',
  logging: false, // Set to true for debugging
});

export default sequelize;
