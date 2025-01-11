import { NextApiRequest, NextApiResponse } from 'next';
import Class from '@/models/class.model';
import Test from '@/models/test.model';
import Student from '@/models/student.model';
import Document from '@/models/document.model';
import checkToken from '../middleware';


// Handle GET (read all schools)

const getClasses = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { yearId } = req.query;

    // Validate yearId
    if (!yearId) {
      return res
        .status(400)
        .json({ message: 'YearId is required for the given classes' });
    }

    // Fetch all classes for the given yearId
    const classes = await Class.findAll({
      where: { yearId },
    });

    // If no classes found, return 404
    if (!classes || classes.length === 0) {
      return res.status(200).json([]);
    }

    // Fetch students and tests for each class
    const classesWithDetails = await Promise.all(
      classes.map(async (classData) => {
        const [tests, students, documents] = await Promise.all([
          Test.findAll({
            where: { classId: classData.id }, // Use classId to fetch related tests
            attributes: ['id', 'name', 'baremType', 'barem'], // Select relevant fields
          }),
          Student.findAll({
            where: { classId: classData.id }, // Use classId to fetch related students
            attributes: ['id', 'name','studentId'], // Select relevant fields
          }),
          Document.findAll({
            where: { classId: classData.id }, // Use classId to fetch related documents
            attributes: ['id', 'name'], // Select relevant fields
          }),
        ]);


        return {
          ...classData.toJSON(), // Convert Sequelize instance to plain object
          tests,
          students,
          documents,
          performances: tests, // Placeholder for performances
        };
      })
    );

    // Return the result
    res.status(200).json(classesWithDetails);
  } catch (error) {
    console.error('Error in getClasses:', error);
    res.status(500).json({ message: 'Error fetching classes', error });
  }
};



// Handle POST (create school)
const createClass = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { name, teacher,  yearId } = req.body;

    const newClass = await Class.create({ name,teacher, yearId });
    res.status(201).json(newClass);
  } catch (error) {
    res.status(500).json({ message: 'Error creating class', error });
  }
};

// Handle PUT (update school)
const updateClass = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const { name } = req.body;

  try {
    const newClass = await Class.findByPk(id as string);
    if (!newClass) return res.status(404).json({ message: 'Class not found' });

    newClass.name = name || newClass.name;
    await newClass.save();
    res.status(200).json(newClass);
  } catch (error) {
    res.status(500).json({ message: 'Error updating school', error });
  }
};

// Handle DELETE (delete school)
const deleteClass = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  try {
    const the_class = await Class.findByPk(id as string);
    if (!the_class) return res.status(404).json({ message: 'School not found' });

    await the_class.destroy();
    res.status(200).json({ message: 'School deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting school', error });
  }
};


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  checkToken(req, res, async () => {
    switch (req.method) {
      case 'GET':
        return getClasses(req, res);
      case 'POST':
        return createClass(req, res);
      case 'PUT':
        return updateClass(req, res);
      case 'DELETE':
        return deleteClass(req, res);
      default:
        res.setHeader('Allow', ['POST', 'GET', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  });
}
