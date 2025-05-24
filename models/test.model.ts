import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../db/sequelize';
import Class from './class.model';

interface TestAttributes {
  id: number;
  name: string;
  classId: number;
  baremType: string;
  barem_B: string;
  barem_F: string;
}

interface TestCreationAttributes extends Optional<TestAttributes, 'id'> {}

class Test extends Model<TestAttributes, TestCreationAttributes> implements TestAttributes {
  public id!: number;
  public name!: string;
  public classId!: number;
  public baremType!: string;
  public barem_B!: string;
  public barem_F!: string;
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
    baremType: {
      type: DataTypes.INTEGER,
      allowNull: false,
  },
    barem_B: {
      type: DataTypes.STRING,
      allowNull: false,
    },
       barem_F: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },


  {
    sequelize,
    tableName: 'tests',
  }
);

Class.hasMany(Test, { foreignKey: 'classId' });
Test.belongsTo(Class, { foreignKey: 'classId' });

export default Test;
