'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class StoryPoint extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      StoryPoint.belongsTo(models.StoryPoint, {as: 'parent', foreignKey: 'ParentID'})
      StoryPoint.hasMany(models.StoryPoint, {as: 'children', foreignKey: 'ParentID'})
      StoryPoint.belongsTo(models.Challenge)
      StoryPoint.hasOne(models.Character)
    }
  }
  StoryPoint.init({
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    flagged: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'StoryPoint',
  });
  return StoryPoint;
};