'use strict';
const models = require("../models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    let creature = await models.Creature.findOne({
      where: {
        name: 'gallina'
      }
    }) 

    queryInterface.bulkInsert('Items', [
      {
      item: 'egg machine gun',
      creatureId: creature.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, 
    {
      item: 'corn',
      creatureId: creature.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, 
    {
      item: 'laser eye',
      creatureId: creature.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    }])
    
    creature = await models.Creature.findOne({
      where: {
        name: 'red dragon'
      }
    })
    
    queryInterface.bulkInsert('Items', [
    {
      item: 'big stick',
      creatureId: creature.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, 
    {
      item: 'ruby',
      creatureId: creature.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, 
    {
      item: 'construction hat',
      creatureId: creature.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    }])

    creature = await models.Creature.findOne({
      where: {
        name: 'queen'
      }
    })

    queryInterface.bulkInsert('Items', [
    {
      item: 'piece of cake',
      creatureId: creature.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, 
    {
      item:  'shiny dagger',
      creatureId: creature.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, 
    {
      item: 'towel',
      creatureID: creature.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    }])

  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Items')
  }
};
