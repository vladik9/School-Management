'use strict';

const bcrypt = require('bcrypt');
require('dotenv').config(); // Load environment variables from .env

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Hash the password
    const saltRounds = parseInt(process.env.BCRYPT_SALT, 10); // Ensure salt is an integer
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, saltRounds);

    // Insert the user with the hashed password
    await queryInterface.bulkInsert('Users', [
      {
        email: 'admin@em.com',
        password_hash: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    // Remove the seeded user
    await queryInterface.bulkDelete('Users', { email: 'admin@em.com' }, {});
  },
};
