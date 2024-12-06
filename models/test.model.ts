import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../db/sequelize';
import Discipline from './discipline.model';

interface TestAttributes {
  id: number;
  name: string;
  disciplineId: number;
}

interface TestCreationAttributes extends Optional<TestAttributes, 'id'> {}

class Test extends Model<TestAttributes, TestCreationAttributes> implements TestAttributes {
  public id!: number;
  public name!: string;
  public disciplineId!: number;
}

Test.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    disciplineId: {
      type: DataTypes.INTEGER,
      references: {
        model: Discipline,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: 'tests',
  }
);

Discipline.hasMany(Test, { foreignKey: 'disciplineId' });
Test.belongsTo(Discipline, { foreignKey: 'disciplineId' });

export default Test;
