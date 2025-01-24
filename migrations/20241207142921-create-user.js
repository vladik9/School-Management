'use strict';

module.exports = {
  /**
   * Creates the 'users' table in the database.
   *
   * This migration defines the structure of the 'users' table,
   * including the following columns:
   * - id: an auto-incrementing integer serving as the primary key.
   * - email: a non-null, unique string representing the email of the user.
   * - password_hash: a non-null string representing the password hash of the user.
   * - auth_token: a nullable string representing the authentication token of the user.
   * - createdAt: a non-null date representing when the record was created.
   * - updatedAt: a non-null date representing when the record was last updated.
   *
   * @param {object} queryInterface - The interface used to communicate with the database.
   * @param {object} Sequelize - The Sequelize library, used for defining data types.
   */
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,  // Ensure that email is unique
      },
      password_hash: {
        type: Sequelize.STRING,
        allowNull: false,  // Password hash is required
      },
      auth_token: {
        type: Sequelize.STRING,
        allowNull: true,
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
   * Drops the 'users' table from the database.
   * This is used for rollbacks, and should be the inverse of the 'up' migration.
   *
   * @param {object} queryInterface - The interface used to communicate with the database.
   * @param {object} Sequelize - The Sequelize library, used for defining data types.
   */
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  },
};
