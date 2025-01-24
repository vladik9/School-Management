'use strict';
const bcrypt = require('bcryptjs');  // Use require for bcrypt

module.exports = {
  /**
   * Creates the admin user in the 'users' table.
   *
   * Generates a hashed password using bcrypt and inserts the admin user with the
   * provided email and hashed password.
   *
   * @param {object} queryInterface - The interface used to communicate with the
   * database.
   * @param {object} Sequelize - The Sequelize library, used for defining data
   * types.
   */
  up: async (queryInterface, Sequelize) => {
    // Generate a hashed password using bcrypt
    const password_hash = await bcrypt.hash('adminAplicatie2025', 10);

    // Insert the admin user into the 'users' table
    await queryInterface.bulkInsert('users', [
      {
        email: 'admin_manager@example.com',  // Admin email
        password_hash: password_hash,  // Hashed password
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  /**
   * Reverts the creation of the admin user in the 'users' table.
   *
   * If the migration is rolled back, this function is called to delete the admin
   * user from the 'users' table.
   *
   * @param {object} queryInterface - The interface used to communicate with the
   * database.
   * @param {object} Sequelize - The Sequelize library, used for defining data
   * types.
   */
  down: async (queryInterface, Sequelize) => {
    // Delete the admin user if rollback occurs
    await queryInterface.bulkDelete('users', {
      email: 'admin_manager@example.com',
    });
  },
};
