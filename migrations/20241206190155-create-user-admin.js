'use strict';
const bcrypt = require('bcryptjs');  // Use require for bcrypt

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Generate a hashed password using bcrypt
    const password_hash = await bcrypt.hash('adminpassword', 10);

    // Insert the admin user into the 'users' table
    await queryInterface.bulkInsert('users', [
      {
        email: 'admin@example.com',  // Admin email
        password_hash: password_hash,  // Hashed password
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    // Delete the admin user if rollback occurs
    await queryInterface.bulkDelete('users', {
      email: 'admin@example.com',
    });
  },
};
