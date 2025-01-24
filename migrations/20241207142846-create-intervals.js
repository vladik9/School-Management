'use strict';

module.exports = {
  /**
   * Creates the 'intervals' table in the database.
   *
   * This migration defines the structure of the 'intervals' table,
   * including the following columns:
   * - id: an auto-incrementing integer serving as the primary key.
   * - testId: an integer, foreign key referencing the 'tests' table.
   * - createdAt: a non-null date representing when the record was created.
   * - updatedAt: a non-null date representing when the record was last updated.
   *
   * @param {object} queryInterface - The interface used to communicate with the database.
   * @param {object} Sequelize - The Sequelize library, used for defining data types.
   */
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('intervals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      testId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'tests',
          key: 'id',
        },
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
   * Drops the 'intervals' table from the database.
   *
   * Reverses the changes made by the `up` function by dropping the 'intervals'
   * table, which was created by the `up` function.
   *
   * @param {object} queryInterface - The interface used to communicate with the database.
   * @param {object} Sequelize - The Sequelize library, used for defining data types.
   */
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('intervals');
  },
};
