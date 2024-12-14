import { NextApiRequest, NextApiResponse } from 'next';
import School from '../../../models/school.model';

// Handle GET (read all schools)
const getSchools = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const schools = await School.findAll();

    if (!schools || schools.length === 0) {
      return res.status(200).json([]);
    }
    res.status(200).json(schools);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching schools', error });
  }
};

// Handle POST (create school)
const createSchool = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { name } = req.body.data;
    const newSchool = await School.create({ name });
    res.status(201).json(newSchool);
  } catch (error) {
    res.status(500).json({ message: 'Error creating school', error });
  }
};

// Handle PUT (update school)
const updateSchool = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const { name } = req.body;

  try {
    const school = await School.findByPk(id as string);
    if (!school) return res.status(404).json({ message: 'School not found' });

    school.name = name || school.name;
    await school.save();
    res.status(200).json(school);
  } catch (error) {
    res.status(500).json({ message: 'Error updating school', error });
  }
};

// Handle DELETE (delete school)
const deleteSchool = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  try {
    const school = await School.findByPk(id as string);
    if (!school) return res.status(404).json({ message: 'School not found' });

    await school.destroy();
    res.status(200).json({ message: 'School deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting school', error });
  }
};



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return getSchools(req, res);
    case 'POST':
      return createSchool(req, res);
    case 'PUT':
      return updateSchool(req, res);
    case 'DELETE':
      return deleteSchool(req, res);
    default:
      res.setHeader('Allow', ['POST','GET','PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
