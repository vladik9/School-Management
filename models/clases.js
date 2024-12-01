'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Clases extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Clases.init({
    disciplineList: DataTypes.STRING,
    docsList: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Clases',
  });
  return Clases;
};