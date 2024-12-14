import { NextApiRequest, NextApiResponse } from 'next';
import Test from '@/models/test.model';

// Handle GET (read all schools)
// API Route to get years by classId
const getTest = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { classId } = req.query;
    // Ensure classId is provided
    if (!classId) {
      return res.status(400).json({ message: 'Test id is required' });
    }

    // Query the 'Test' table to find all years for the given classId
    const discipline = await Test.findAll({
      where: { classId },  // Use `where` to filter by classId
    });

    // If no tests found, return 404
    if (!discipline || discipline.length === 0) {
      return res.status(200).json({ message: 'Test not found for the given classId' });
    }

    // Return the found tests
    res.status(200).json(discipline);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching test', error });
  }
};

// Handle POST (create school)
const createTest = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { name,  barem, classId } = req.body;
    const baremType = barem;
    const newDiscipline = await Test.create({name, baremType, classId });
    res.status(201).json(newDiscipline);
  } catch (error) {
    res.status(500).json({ message: 'Error creating test', error });
  }
};

// Handle PUT (update school)
const updateTest = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const { name } = req.body;

  try {
    const year = await Test.findByPk(id as string);
    if (!year) return res.status(404).json({ message: 'Test not found' });

    year.name = name || year.name;
    await year.save();
    res.status(200).json(year);
  } catch (error) {
    res.status(500).json({ message: 'Error updating test', error });
  }
};

// Handle DELETE (delete school)
const deleteTest = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  try {
    const year = await Test.findByPk(id as string);
    if (!year) return res.status(404).json({ message: 'Test not found' });

    await year.destroy();
    res.status(200).json({ message: 'Test deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting test', error });
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
