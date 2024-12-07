import { NextApiRequest, NextApiResponse } from 'next';
import Class from '../../../models/class.model';

// Handle GET (read all schools)

const getClasses = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { yearId } = req.query;
    // Ensure schoolId is provided
    if (!yearId) {
      return res.status(400).json({ message: 'YearId is required' });
    }

    // Query the 'Year' table to find all years for the given schoolId
    const years = await Class.findAll({
      where: { yearId },  // Use `where` to filter by schoolId
    });

    // If no years found, return 404
    if (!years || years.length === 0) {
      return res.status(404).json({ message: 'Years not found for the given yearId' });
    }
    // Return the found years
    res.status(200).json(years);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching classes', error });
  }
};


// Handle POST (create school)
const createClass = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { name, yearId } = req.body.data;
    const newClass = await Class.create({ name, yearId });
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
      res.setHeader('Allow', ['POST','GET','PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
