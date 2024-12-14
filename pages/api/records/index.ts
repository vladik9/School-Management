import { NextApiRequest, NextApiResponse } from 'next';
import Record from '../../../models/record.model';

// Handle GET (read all records)
// API Route to get records by intervalId
const getRecord = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { intervalId } = req.query;
    // Ensure intervalId is provided
    if (!intervalId) {
      return res.status(400).json({ message: 'IntervalId is required' });
    }

    // Query the 'Record' table to find all records for the given schoolId
    const records = await Record.findAll({
      where: { intervalId },  // Use `where` to filter by intervalId
    });

    // If no records found, return 404
    if (!records || records.length === 0) {
      return res.status(404).json([]);
    }

    // Return the found records
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching records', error });
  }
};



// Handle POST (create record)
const createRecord = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { startTime, endTime, intervalId } = req.body;
    console.log("🚀 ~ createRecord ~ startTime, endTime, intervalId:", startTime, endTime, intervalId)

    const newRecord = await Record.create({startTime, endTime, intervalId });
    res.status(201).json(newRecord);
  } catch (error) {
    res.status(500).json({ message: 'Error creating record', error });
  }
};

// Handle PUT (update record)
const updateRecord = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const { startTime, endTime } = req.body;

  try {
    const record = await Record.findByPk(id as string);
    if (!record) return res.status(404).json({ message: 'Record not found' });

    record.name = name || record.name;
    await record.save();
    res.status(200).json(record);
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
}
