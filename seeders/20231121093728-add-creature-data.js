'use strict';

const { where } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  
     return queryInterface.bulkInsert('Creatures', [
      {
        name: 'gallina',
        description: 'like her cousin the dinosaur, the gallina is fierce',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'red dragon',
        description: 'this dragon is, unlike other dragons, very red',
        createdAt: new Date(),
        updatedAt: new Date(),
      }, 
      {
        name: 'queen',
        description: 'this queen does not eat cake',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Creatures')
  }
};
