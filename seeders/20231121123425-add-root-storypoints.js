'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Storypoints', [
      {
      title: 'you step into the woods',
      content: 'the trees, filled with many unknown creatures, swallow you up in a sea of muffled screams and darkness. where will you go?',
      createdAt: new Date(),
      updatedAt: new Date(),
    }])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Storypoints')
  }
};
