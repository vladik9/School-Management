import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../db/sequelize';
import Test from './test.model';
import Student from './student.model';

interface IntervalAttributes {
  id: number;
  startTime: Date;
  endTime: Date;
  testId: number;
  studentId: number;
}

interface IntervalCreationAttributes extends Optional<IntervalAttributes, 'id'> {}

class Interval extends Model<IntervalAttributes, IntervalCreationAttributes> implements IntervalAttributes {
  public id!: number;
  public startTime!: Date;
  public endTime!: Date;
  public testId!: number;
  public studentId!: number;
}

Interval.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    testId: {
      type: DataTypes.INTEGER,
      references: {
        model: Test,
        key: 'id',
      },
    },
    studentId: {
      type: DataTypes.INTEGER,
      references: {
        model: Test,
        key: 'id',
      },
    }
  },
  {
    sequelize,
    tableName: 'intervals',
  }
);

Test.hasMany(Interval, { foreignKey: 'testId' });
Student.hasMany(Interval, { foreignKey: 'studentId' });
Interval.belongsTo(Test, { foreignKey: 'testId' });

export default Interval;
