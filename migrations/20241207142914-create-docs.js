'use strict';

module.exports = {
  /**
   * Creates the 'docs' table in the database.
   *
   * This migration defines the structure of the 'docs' table,
   * including the following columns:
   * - id: an auto-incrementing integer serving as the primary key.
   * - filePath: a non-null string representing the path to the document.
   * - testId: an integer, foreign key referencing the 'tests' table.
   * - createdAt: a non-null date representing when the record was created.
   * - updatedAt: a non-null date representing when the record was last updated.
   *
   * @param {object} queryInterface - The interface used to communicate with the database.
   * @param {object} Sequelize - The Sequelize library, used for defining data types.
   */
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('docs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      filePath: {
        type: Sequelize.STRING,
        allowNull: false,
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
   * Reverts the 'docs' table from the database.
   *
   * Drops the 'docs' table, removing all records and the table structure.
   *
   * @param {object} queryInterface - The interface used to communicate with the database.
   * @param {object} Sequelize - The Sequelize library, used for defining data types.
   */

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('docs');
  },
};
