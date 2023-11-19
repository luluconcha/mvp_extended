'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable("CreatureDefaultItems", {
      CreatureID: {
        type: Sequelize.INTEGER,
        references: {
          model: "Creatures",
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
    return queryInterface.dropTable("CreatureDefaultItems")
  }
};
