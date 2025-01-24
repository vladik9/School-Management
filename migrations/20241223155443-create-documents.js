'use strict';

module.exports = {
  /**
   * Creates the 'documents' table in the database.
   *
   * This migration defines the structure of the 'documents' table,
   * including the following columns:
   * - id: an auto-incrementing integer serving as the primary key.
   * - name: a non-null string representing the name of the document.
   * - classId: an integer, foreign key referencing the 'classes' table.
   * - filePath: a non-null string representing the path to the document.
   * - createdAt: a non-null date representing when the record was created.
   * - updatedAt: a non-null date representing when the record was last updated.
   *
   * @param {object} queryInterface - The interface used to communicate with the database.
   * @param {object} Sequelize - The Sequelize library, used for defining data types.
   */

  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('documents', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      classId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'classes', // name of the table
          key: 'id',
        },
        allowNull: false,
      },
      filePath: {
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
   * Reverts the 'documents' table from the database.
   *
   * Drops the 'documents' table, removing all records and the table structure.
   *
   * @param {object} queryInterface - The interface used to communicate with the database.
   * @param {object} Sequelize - The Sequelize library, used for defining data types.
   */
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('documents');
  },
};
