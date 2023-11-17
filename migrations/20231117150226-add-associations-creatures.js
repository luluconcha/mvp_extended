'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      "Characters",
      "CreatureID",
      {
        type: Sequelize.INTEGER,
        references: {
          model: "Creatures",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      }
    ),
    queryInterface.addColumn(
      "Items",
      "CreatureID",
      {
        type: Sequelize.INTEGER,
        references: {
          model: "Creatures",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      }
    )
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      "Items",
      "CreatureID"
    ),
    queryInterface.removeColumn(
      "Characters",
      "CreatureID"
    )
  }
};
