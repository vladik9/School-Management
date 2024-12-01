'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Discipline extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Discipline.init({
    name: DataTypes.STRING,
    probsList: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Discipline',
  });
  return Discipline;
};