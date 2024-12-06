import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../db/sequelize'; // Assuming you have sequelize instance exported

interface SchoolAttributes {
  id: number;
  name: string;
}

interface SchoolCreationAttributes extends Optional<SchoolAttributes, 'id'> {}

class School extends Model<SchoolAttributes, SchoolCreationAttributes> implements SchoolAttributes {
  public id!: number;
  public name!: string;
}

School.init(
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
  },
  {
    sequelize,
    tableName: 'schools',
  }
);

export default School;
