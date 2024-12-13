import { NextApiRequest, NextApiResponse } from 'next';
import Student from '@/models/student.model';

// Handle GET (read all schools)

const getStudents = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { classId } = req.query;

    // Validate classId
    if (!classId) {
      return res.status(400).json({ message: 'ClassId is required for the given classes' });
    }

    // Fetch all classes for the given yearId
    const students = await Student.findAll({
      where: {  classId },
    });

    // If no classes found, return 404
    if (!students || students.length === 0) {
      return res.status(404).json( []);
    }

    // Fetch disciplines for each class


    // Return the result
    res.status(200).json(students);
  } catch (error) {
    console.error("Error in getStudents:", error);
    res.status(500).json({ message: 'Error fetching studenst', error });
  }
};



// Handle POST (create school)
const createStudent = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { name, studentId,  classId } = req.body;

    const newStudent = await Student.create({ name, studentId, classId });
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(500).json({ message: 'Error creating student', error });
  }
};

// Handle PUT (update school)
const updateStudent = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const { name } = req.body;

  try {
    const newStudent = await Student.findByPk(id as string);
    if (!newStudent) return res.status(404).json({ message: 'Student not found' });

    newStudent.name = name || newStudent.name;
    await newStudent.save();
    res.status(200).json(newStudent);
  } catch (error) {
    res.status(500).json({ message: 'Error updating student', error });
  }
};

// Handle DELETE (delete school)
const deleteStudent = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  try {
    const student = await Student.findByPk(id as string);
    if (!student) return res.status(404).json({ message: 'Student not found' });

    await student.destroy();
    res.status(200).json({ message: 'Student deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting student', error });
  }
};



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return getStudents(req, res);
    case 'POST':
      return createStudent(req, res);
    case 'PUT':
      return updateStudent(req, res);
    case 'DELETE':
      return deleteStudent(req, res);
    default:
      res.setHeader('Allow', ['POST','GET','PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
