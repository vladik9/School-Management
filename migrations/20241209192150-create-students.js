'use strict';

module.exports = {
  /**
   * Creates the 'students' table in the database.
   *
   * This migration defines the structure of the 'students' table,
   * including the following columns:
   * - id: an auto-incrementing integer serving as the primary key.
   * - name: a non-null string representing the name of the student.
   * - studentId: a non-null string representing the student's ID.
   * - classId: an integer, foreign key referencing the 'classes' table.
   * - createdAt: a non-null date representing when the record was created.
   * - updatedAt: a non-null date representing when the record was last updated.
   *
   * @param {object} queryInterface - The interface used to communicate with the database.
   * @param {object} Sequelize - The Sequelize library, used for defining data types.
   */
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('students', {
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
      studentId: {
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
   * Drops the 'students' table from the database.
   *
   * Reverses the changes made by the `up` function by dropping the 'students'
   * table, which was created by the `up` function.
   *
   * @param {object} queryInterface - The interface used to communicate with the database.
   * @param {object} Sequelize - The Sequelize library, used for defining data types.
   */
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('students');
  },
};
