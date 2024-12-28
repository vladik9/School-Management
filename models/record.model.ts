import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../db/sequelize';
import Interval from './interval.model';
import Student from './student.model';

interface RecordAttributes {
  id: number;
  value: string;
  intervalId: number;
  studentId: number;
}

interface IntervalCreationAttributes extends Optional<RecordAttributes, 'id'> {}

class Record extends Model<RecordAttributes, IntervalCreationAttributes> implements RecordAttributes {
  public id!: number;
  public value!: string;
  public intervalId!: number;
  public studentId!: number;
}

Record.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    intervalId: {
      type: DataTypes.INTEGER,
      references: {
        model: Interval,
        key: 'id',
      },
    },
    studentId: {
      type: DataTypes.INTEGER,
      references: {
        model: Interval,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: 'records',
  }
);

Interval.hasMany(Record, { foreignKey: 'intervalId' });
Student.hasMany(Record, { foreignKey: 'intervalId' });

Record.belongsTo(Interval, { foreignKey: 'intervalId' });

export default Record;
