import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../db/sequelize';
import Test from './test.model';
interface DocAttributes {
  id: number;
  filePath: string;
  testId: number;
}

interface DocCreationAttributes extends Optional<DocAttributes, 'id'> {}

class Doc extends Model<DocAttributes, DocCreationAttributes> implements DocAttributes {
  public id!: number;
  public filePath!: string;
  public testId!: number;
}

Doc.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    filePath: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    testId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'tests', // Reference to tests table
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: 'docs',
  }
);

Test.hasMany(Doc, { foreignKey: 'testId' });
Doc.belongsTo(Test, { foreignKey: 'testId' });

export default Doc;
