'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable("CharacterInventory", {
      CharacterID: {
        type: Sequelize.INTEGER,
        references: {
          model: "Characters",
          key: "id",
        },
        allowNull: false,
      },
      ItemID: {
        type: Sequelize.INTEGER,
        references: {
          model: "Items",
          key: "id",
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

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable("CharacterInventory")
  }
};
