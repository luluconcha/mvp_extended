'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      "StoryPoints",
      "ParentID",
      {
        type: Sequelize.INTEGER,
        references: {
          model: "StoryPoints",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
      }
    )
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      "StoryPoints",
      "ParentID"
    )
  }
};
