'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    
    static associate(models) {
      Item.belongsToMany(models.Character, {through: "CharacterInventory"})
      Item.belongsTo(models.Creature)
    }
  }
  Item.init({
    item: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Item',
  });
  return Item;
};