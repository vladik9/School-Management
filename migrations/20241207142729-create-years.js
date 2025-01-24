'use strict';

module.exports = {
  /**
   * Creates the 'years' table in the database.
   *
   * This migration defines the structure of the 'years' table,
   * including the following columns:
   * - id: an auto-incrementing integer serving as the primary key.
   * - name: a non-null string representing the name of the year.
   * - schoolId: an integer, foreign key referencing the 'schools' table.
   * - createdAt: a non-null date representing when the record was created.
   * - updatedAt: a non-null date representing when the record was last updated.
   *
   * @param {object} queryInterface - The interface used to communicate with the database.
   * @param {object} Sequelize - The Sequelize library, used for defining data types.
   */
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('years', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      schoolId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'schools',
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
   * Reverts the 'years' table from the database.
   *
   * Drops the 'years' table, removing all records and the table structure.
   *
   * @param {object} queryInterface - The interface used to communicate with the database.
   * @param {object} Sequelize - The Sequelize library, used for defining data types.
   */
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('years');
  },
};
