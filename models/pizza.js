'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pizza extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Pizza.init({
    Nom: DataTypes.STRING,
    Ingredients: DataTypes.STRING,
    Prix: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pizza',
  });
  return Pizza;
};