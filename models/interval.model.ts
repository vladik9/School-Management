import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../db/sequelize';
import Test from './test.model';

interface IntervalAttributes {
  id: number;
  testId: number;
}

interface IntervalCreationAttributes extends Optional<IntervalAttributes, 'id'> {}

class Interval extends Model<IntervalAttributes, IntervalCreationAttributes> implements IntervalAttributes {
  public id!: number;
  public testId!: number;
}

Interval.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    testId: {
      type: DataTypes.INTEGER,
      references: {
        model: Test,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: 'intervals',
  }
);

Test.hasMany(Interval, { foreignKey: 'testId' });
Interval.belongsTo(Test, { foreignKey: 'testId' });

export default Interval;
