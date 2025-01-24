'use strict';

module.exports = {
  /**
   * Creates the 'classes' table in the database.
   *
   * This migration defines the structure of the 'classes' table,
   * including the following columns:
   * - id: an auto-incrementing integer serving as the primary key.
   * - name: a non-null string representing the name of the class.
   * - teacher: a non-null string representing the name of the teacher.
   * - yearId: an integer, foreign key referencing the 'years' table.
   * - createdAt: a non-null date representing when the record was created.
   * - updatedAt: a non-null date representing when the record was last updated.
   *
   * @param {object} queryInterface - The interface used to communicate with the database.
   * @param {object} Sequelize - The Sequelize library, used for defining data types.
   */

  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('classes', {
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
      teacher: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      yearId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'years', // Name of the table you're referencing
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
   * Reverts the 'classes' table from the database.
   *
   * Drops the 'classes' table, removing all records and the table structure.
   *
   * @param {object} queryInterface - The interface used to communicate with the database.
   * @param {object} Sequelize - The Sequelize library, used for defining data types.
   */
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('classes');
  },
};
