import { NextApiRequest, NextApiResponse } from 'next';
import Year from '../../../models/year.model';
import checkToken from '../middleware/index';

// Handle GET (read all years)
// API Route to get years by schoolId
const getYear = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { schoolId } = req.query;
    // Ensure schoolId is provided
    if (!schoolId) {
      return res.status(400).json({ message: 'SchoolId is required' });
    }

    // Query the 'Year' table to find all years for the given schoolId
    const years = await Year.findAll({
      where: { schoolId },  // Use `where` to filter by schoolId
    });

    // If no years found, return 404
    if (!years || years.length === 0) {
      return res.status(200).json({ message: 'Years not found for the given schoolId' });
    }

    // Return the found years
    res.status(200).json(years);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching years', error });
  }
};

// Handle POST (create school)
const createYear = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const {year: name, schoolId } = req.body;
    const newYear = await Year.create({name, schoolId });
    res.status(201).json(newYear);
  } catch (error) {
    res.status(500).json({ message: 'Error creating year', error });
  }
};

// Handle PUT (update school)
const updateYear = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const { name } = req.body;

  try {
    const year = await Year.findByPk(id as string);
    if (!year) return res.status(404).json({ message: 'Year not found' });

    year.name = name || year.name;
    await year.save();
    res.status(200).json(year);
  } catch (error) {
    res.status(500).json({ message: 'Error updating year', error });
  }
};

// Handle DELETE (delete school)
const deleteYear = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  try {
    const year = await Year.findByPk(id as string);
    if (!year) return res.status(404).json({ message: 'Year not found' });

    await year.destroy();
    res.status(200).json({ message: 'Year deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting year', error });
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  checkToken(req, res, async () => {
  switch (req.method) {
    case 'GET':
      return getYear(req, res);
    case 'POST':
      return createYear(req, res);
    case 'PUT':
      return updateYear(req, res);
    case 'DELETE':
      return deleteYear(req, res);
    default:
      res.setHeader('Allow', ['POST','GET','PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
});
}
