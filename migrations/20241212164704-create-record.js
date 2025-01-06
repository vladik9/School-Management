'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('records', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      value: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      intervalId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'intervals',
          key: 'id',
        },
        allowNull: false,
      },
      studentId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'students',
          key: 'id',
        },
        allowNull: false,
      },
      studentGeneratedId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('records');
  },
};
