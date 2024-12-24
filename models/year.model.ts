import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../db/sequelize';
import School from './school.model';

interface ClassAttributes {
  id: number;
  name: string;
  schoolId: number;
}

interface ClassCreationAttributes extends Optional<ClassAttributes, 'id'> {}

class Class extends Model<ClassAttributes, ClassCreationAttributes> implements ClassAttributes {
  public id!: number;
  public name!: string;
  public schoolId!: number;
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
    schoolId: {
      type: DataTypes.INTEGER,
      references: {
        model: School,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: 'years',
  }
);

School.hasMany(Class, { foreignKey: 'schoolId' });
Class.belongsTo(School, { foreignKey: 'schoolId' });

export default Class;
