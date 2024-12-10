import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../db/sequelize';
import Class from './class.model';

interface StudentAttributes {
  id: number;
  name: string;
  studentId: number;
  classId: number;
}

interface TestCreationAttributes extends Optional<StudentAttributes, 'id'> {}

class Student extends Model<StudentAttributes, TestCreationAttributes> implements StudentAttributes {
  public id!: number;
  public name!: string;
  public studentId!: number;
  public classId!: number;
}

Student.init(
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
    studentId: {
      type: DataTypes.INTEGER,
      references: {
        model: Class,
        key: 'id',
      },
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
    tableName: 'students',
  }
);

Class.hasMany(Student, { foreignKey: 'classId' });
Student.belongsTo(Class, { foreignKey: 'classId' });

export default Student;
