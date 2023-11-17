'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      "StoryPoints",
      "CharacterID",
      {
        type: Sequelize.INTEGER,
        references: {
          model: "Characters",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      }
    )
  },

  async down (queryInterface, Sequelize) {
   return queryInterface.removeColumn(
    "Storypoints",
    "CharacterID"
   )
  }
};
