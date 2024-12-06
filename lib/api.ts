import { Sequelize, DataTypes, Model } from 'sequelize';

// Initialize Sequelize
const sequelize = new Sequelize('school_management', 'school_app_user', 'shool_db_acces', {
  host: '127.0.0.1',
  dialect: 'mysql',
});

// Define a sample model
class Student extends Model {}
Student.init({
  name: DataTypes.STRING,
  age: DataTypes.INTEGER,
}, {
  sequelize,
  modelName: 'Student',
});

// Create
async function createStudent(name: string, age: number) {
  return await Student.create({ name, age });
}

// Read
async function getStudents() {
  return await Student.findAll();
}

async function getStudentById(id: number) {
  return await Student.findByPk(id);
}

// Update
async function updateStudent(id: number, updatedData: { name?: string; age?: number }) {
  const student = await Student.findByPk(id);
  if (student) {
    return await student.update(updatedData);
  }
  return null;
}

// Delete
async function deleteStudent(id: number) {
  const student = await Student.findByPk(id);
  if (student) {
    await student.destroy();
    return true;
  }
  return false;
}

export { createStudent, getStudents, getStudentById, updateStudent, deleteStudent };
