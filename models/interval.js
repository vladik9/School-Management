'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Interval extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Interval.init({
    timeStart: DataTypes.STRING,
    timeEnd: DataTypes.STRING,
    Average: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Interval',
  });
  return Interval;
};