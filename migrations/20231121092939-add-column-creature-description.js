'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      "Creatures",
      "Description",
      {
        type: Sequelize.STRING,
      }
    )
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      "Creatures", 
      "Description"
    )
  }
};
