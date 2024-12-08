import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../db/sequelize';
import Year from './year.model';

interface ClassAttributes {
  id: number;
  name: string;
  teacher: string;
  yearId: number;
}

interface ClassCreationAttributes extends Optional<ClassAttributes, 'id'> {}

class Class extends Model<ClassAttributes, ClassCreationAttributes> implements ClassAttributes {
  public id!: number;
  public name!: string;
  public teacher!: string;
  public yearId!: number;
}

Class.init(
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
    teacher: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    yearId: {
      type: DataTypes.INTEGER,
      references: {
        model: Year,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: 'classes',
  }
);

Year.hasMany(Class, { foreignKey: 'yearId' });
Class.belongsTo(Year, { foreignKey: 'yearId' });

export default Class;
