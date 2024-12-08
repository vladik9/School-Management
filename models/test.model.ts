import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../db/sequelize';
import Class from './class.model';

interface TestAttributes {
  id: number;
  name: string;
  classId: number;
}

interface TestCreationAttributes extends Optional<TestAttributes, 'id'> {}

class Test extends Model<TestAttributes, TestCreationAttributes> implements TestAttributes {
  public id!: number;
  public name!: string;
  public classId!: number;
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
    classId: {
      type: DataTypes.INTEGER,
      references: {
        model: Class,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: 'tests',
  }
);

Class.hasMany(Test, { foreignKey: 'classId' });
Test.belongsTo(Class, { foreignKey: 'classId' });

export default Test;
