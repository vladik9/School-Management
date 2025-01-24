'use strict';

const bcrypt = require('bcrypt');
require('dotenv').config(); // Load environment variables from .env

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  /**
   * Inserts the main admin user into the 'users' table.
   *
   * The admin user is created with the email 'admin@em.com' and the password
   * provided in the .env file as ADMIN_PASSWORD. The password is hashed
   * using bcrypt with the number of salt rounds provided in .env as BCRYPT_SALT.
   *
   * @param {object} queryInterface - The interface used to communicate with the database.
   * @param {object} Sequelize - The Sequelize library, used for defining data types.
   */
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

  /**
   * Reverts the 'users' table from the database.
   *
   * Removes the seeded user with email 'admin@em.com', reverting the table to its original state.
   *
   * @param {object} queryInterface - The interface used to communicate with the database.
   * @param {object} Sequelize - The Sequelize library, used for defining data types.
   */
  async down(queryInterface, Sequelize) {
    // Remove the seeded user
    await queryInterface.bulkDelete('Users', { email: 'admin@em.com' }, {});
  },
};
