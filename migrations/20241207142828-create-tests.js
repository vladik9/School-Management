'use strict';

module.exports = {
  /**
   * Creates the 'tests' table in the database.
   *
   * This migration defines the structure of the 'tests' table,
   * including the following columns:
   * - id: an auto-incrementing integer serving as the primary key.
   * - name: a non-null string representing the name of the test.
   * - classId: an integer, foreign key referencing the 'classes' table.
   * - baremType: an integer representing the type of the barem.
   * - barem: a string representing the barem.
   * - createdAt: a non-null date representing when the record was created.
   * - updatedAt: a non-null date representing when the record was last updated.
   *
   * @param {object} queryInterface - The interface used to communicate with the
   * database.
   * @param {object} Sequelize - The Sequelize library, used for defining data
   * types.
   */
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tests', {
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
      classId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'classes', // Name of the table you're referencing
          key: 'id',
        },
        allowNull: false,
      },
      baremType: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      barem: {
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
   * Drops the 'tests' table from the database.
   */
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('tests');
  },
};
