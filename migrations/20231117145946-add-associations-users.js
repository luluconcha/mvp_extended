'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      "Characters",
      "UserID",
      {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      }
    ),
    queryInterface.addColumn(
      "StoryPoints",
      "UserID",
      {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      }
    )

  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      "StoryPoints",
      "UserID"
    ),
    queryInterface.removeColumn(
      "Characters",
      "UserID"
    )
  }
};
