'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
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