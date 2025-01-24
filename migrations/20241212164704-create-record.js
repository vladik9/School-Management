'use strict';

module.exports = {
  /**
   * Creates the 'records' table in the database.
   *
   * This migration defines the structure of the 'records' table,
   * including the following columns:
   * - id: an auto-incrementing integer serving as the primary key.
   * - value: a non-null string representing the value of the record.
   * - intervalId: an integer, foreign key referencing the 'intervals' table.
   * - studentId: an integer, foreign key referencing the 'students' table.
   * - studentGeneratedId: a non-null string representing the student-generated id.
   * - createdAt: a non-null date representing when the record was created.
   * - updatedAt: a non-null date representing when the record was last updated.
   *
   * @param {object} queryInterface - The interface used to communicate with the database.
   * @param {object} Sequelize - The Sequelize library, used for defining data types.
   */
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
        type: Sequelize.STRING,
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

  /**
   * Reverts the 'records' table from the database.
   *
   * Drops the 'records' table, removing all records and the table structure.
   *
   * @param {object} queryInterface - The interface used to communicate with the database.
   * @param {object} Sequelize - The Sequelize library, used for defining data types.
   */

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('records');
  },
};
