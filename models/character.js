'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Character extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Character.belongsTo(models.User)
      Character.belongsTo(models.Creature)
      Character.hasMany(models.Item)
    }
  }
  Character.init({
    name: DataTypes.STRING,
    pronouns: DataTypes.STRING,
    background: DataTypes.STRING,
    energyLevel: DataTypes.INTEGER,
    cuteness: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Character',
  });
  return Character;
};