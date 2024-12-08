import { NextApiRequest, NextApiResponse } from 'next';
import Test from '@/models/test.model';

// Handle GET (read all schools)
// API Route to get years by schoolId
const getTest = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { classId } = req.query;
    // Ensure schoolId is provided
    if (!classId) {
      return res.status(400).json({ message: 'Discipline id is required' });
    }

    // Query the 'Year' table to find all years for the given schoolId
    const discipline = await Test.findAll({
      where: { classId },  // Use `where` to filter by schoolId
    });

    // If no years found, return 404
    if (!discipline || discipline.length === 0) {
      return res.status(404).json({ message: 'Disciplines not found for the given schoolId' });
    }

    // Return the found years
    res.status(200).json(discipline);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching discipline', error });
  }
};

// Handle POST (create school)
const createTest = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { name, classId } = req.body;
    const newDiscipline = await Test.create({name, classId });
    res.status(201).json(newDiscipline);
  } catch (error) {
    res.status(500).json({ message: 'Error creating discipline', error });
  }
};

// Handle PUT (update school)
const updateTest = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const { name } = req.body;

  try {
    const year = await Test.findByPk(id as string);
    if (!year) return res.status(404).json({ message: 'Discipline not found' });

    year.name = name || year.name;
    await year.save();
    res.status(200).json(year);
  } catch (error) {
    res.status(500).json({ message: 'Error updating discipline', error });
  }
};

// Handle DELETE (delete school)
const deleteTest = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  try {
    const year = await Test.findByPk(id as string);
    if (!year) return res.status(404).json({ message: 'Discipline not found' });

    await year.destroy();
    res.status(200).json({ message: 'Discipline deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting discipline', error });
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return getTest(req, res);
    case 'POST':
      return createTest(req, res);
    case 'PUT':
      return updateTest(req, res);
    case 'DELETE':
      return deleteTest(req, res);
    default:
      res.setHeader('Allow', ['POST','GET','PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
