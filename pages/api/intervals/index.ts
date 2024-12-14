import { NextApiRequest, NextApiResponse } from 'next';
import Interval from '@/models/interval.model';

// Handle GET (read all schools)
// API Route to get years by schoolId
const getInterval = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { testId } = req.query;
    // Ensure testId is provided
    if (!testId) {
      return res.status(400).json({ message: 'Test id is required' });
    }

    // Query the 'Year' table to find all years for the given schoolId
    const test = await Interval.findAll({
      where: { testId },  // Use `where` to filter by schoolId
    });

    // If no years found, return 404
    if (!test || test.length === 0) {
      return res.status(404).json({ message: 'Test not found for the given testId' });
    }

    // Return the found years
    res.status(200).json(test);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching test', error });
  }
};

// Handle POST (create school)
const createInterval = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { testId } = req.body;
    const newInterval = await Interval.create({ testId });
    res.status(201).json(newInterval);
  } catch (error) {
    res.status(500).json({ message: 'Error creating test', error });
  }
};

// Handle PUT (update school)
const updateInterval = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const { name } = req.body;

  try {
    const year = await Interval.findByPk(id as string);
    if (!year) return res.status(404).json({ message: 'Test not found' });

    year.name = name || year.name;
    await year.save();
    res.status(200).json(year);
  } catch (error) {
    res.status(500).json({ message: 'Error updating test', error });
  }
};

// Handle DELETE (delete school)
const deleteInterval = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  try {
    const year = await Interval.findByPk(id as string);
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
      return getInterval(req, res);
    case 'POST':
      return createInterval(req, res);
    case 'PUT':
      return updateInterval(req, res);
    case 'DELETE':
      return deleteInterval(req, res);
    default:
      res.setHeader('Allow', ['POST','GET','PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
