'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      "StoryPoints",
      "ChallengeID",
      {
        type: Sequelize.INTEGER,
        references: {
          model: "Challenges",
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
      "ChallengeID"
    )
  }
};
