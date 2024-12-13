import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../db/sequelize';
import Interval from './interval.model';

interface RecordAttributes {
  id: number;
  startTime: Date;
  endTime: Date;
  intervalId: number;
}

interface IntervalCreationAttributes extends Optional<RecordAttributes, 'id'> {}

class Record extends Model<RecordAttributes, IntervalCreationAttributes> implements RecordAttributes {
  public id!: number;
  public startTime!: Date;
  public endTime!: Date;
  public intervalId!: number;
}

Record.init(
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
    intervalId: {
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
Record.belongsTo(Interval, { foreignKey: 'intervalId' });

export default Record;
