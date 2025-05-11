'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  /**
   * Adds a 'sharableLink' column to the 'documents' table.
   *
   * This migration adds a new 'sharableLink' column to the 'documents' table, which
   * will be used to store a URL that can be accessed by users who are not logged
   * into the application to view the document.
   *
   * @param {object} queryInterface - The interface used to communicate with the database.
   * @param {object} Sequelize - The Sequelize library, used for defining data types.
   */
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'documents',      // name of the existing table
      'sharableLink',   // new column name (camelCase to match your other columns)
      {
        type: Sequelize.STRING,
        allowNull: true,  // nullable by default
      }
    );
  },

  /**
   * Removes the 'sharableLink' column from the 'documents' table.
   *
   * This function is used for rolling back the migration that added the
   * 'sharableLink' column, effectively reverting the 'documents' table to its
   * previous state without the column.
   *
   * @param {object} queryInterface - The interface used to communicate with the database.
   * @param {object} Sequelize - The Sequelize library, used for defining data types.
   */

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('documents', 'sharableLink');
  }
};
