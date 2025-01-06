import { NextApiRequest, NextApiResponse } from 'next';
import Record from '../../../models/record.model';
import Student from '../../../models/student.model';
import checkToken from '../middleware/index';

// Handle GET (read all records)
// API Route to get records by intervalId
const getRecord = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { intervalId } = req.query;
    // Ensure intervalId is provided
    if (!intervalId) {
      return res.status(400).json({ message: 'IntervalId is required' });
    }

    // Query the 'Record' table to find all records for the given intervalId
    const records = await Record.findAll({
      where: { intervalId },  // Use `where` to filter by intervalId
    });

    // If no records found, return 404
    if (!records || records.length === 0) {
      return res.status(200).json([]);
    }

    // Find students that match the studentIds in the records
    const studentIds = records.map(record => record.studentId);
    const students = await Student.findAll({
      where: { id: studentIds },
    });
    if (students) {
      for (let i = 0; i < records.length; i++) {
        records[i].studentData = students.find(student => student.id === records[i].studentId);
      }
    }
    // Return the found students
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching records', error });
  }
};



// Handle POST (create record)
const createRecord = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { value, studentId,  intervalId } = req.body;

    const newRecord = await Record.create({value, studentId, intervalId });
    res.status(201).json(newRecord);
  } catch (error) {
    res.status(500).json({ message: 'Error creating record', error });
  }
};

// Handle PUT (update record)
const updateRecord = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const { value,  studentId,  intervalId } = req.body;

  try {
    const record = await Record.findByPk(id as string);
    if (!record) return res.status(404).json({ message: 'Record not found' });

    await record.update({ value, studentId, intervalId });
    res.status(200).json({ message: 'Record updated' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating record', error });
  }
};

// Handle DELETE (delete record)
const deleteRecord = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  try {
    const record = await Record.findByPk(id as string);
    if (!record) return res.status(404).json({ message: 'Record not found' });

    await record.destroy();
    res.status(200).json({ message: 'Record deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting record', error });
  }
};



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  checkToken(req, res, async () => {
  switch (req.method) {
    case 'GET':
      return getRecord(req, res);
    case 'POST':
      return createRecord(req, res);
    case 'PUT':
      return updateRecord(req, res);
    case 'DELETE':
      return deleteRecord(req, res);
    default:
      res.setHeader('Allow', ['POST','GET','PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
  });
}
