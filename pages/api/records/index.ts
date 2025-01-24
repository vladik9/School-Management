import { NextApiRequest, NextApiResponse } from 'next';
import Record from '../../../models/record.model';
import Student from '../../../models/student.model';
import checkToken from '../middleware/index';

/**
 * Handles a GET request to fetch records for the given intervalId.
 *
 * It expects the intervalId to be provided in the query string.
 * If the intervalId is not provided, it returns a 400 status with an error message.
 * If no records are found for the given intervalId, it returns an empty array.
 * Otherwise, it returns an array of records with their associated student data.
 */
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

/**
 * Handles POST requests to create a new record.
 *
 * This function extracts the value, studentId, intervalId, and studentGeneratedId
 * from the request body to create a new record in the database. If successful,
 * it returns the newly created record with a 201 status. In case of an error,
 * it returns a 500 status with an error message.
 *
 * @param {NextApiRequest} req - The API request object containing the record details
 * in the body.
 * @param {NextApiResponse} res - The API response object used to return the status
 * and JSON payload to the client.
 */

const createRecord = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { value, studentId,  intervalId,studentGeneratedId } = req.body;

    const newRecord = await Record.create({value, studentId, studentGeneratedId, intervalId });
    res.status(201).json(newRecord);
  } catch (error) {
    res.status(500).json({ message: 'Error creating record', error });
  }
};

/**
 * Handles PUT requests to update a record.
 *
 * This function extracts the id, value, studentId, and intervalId from the
 * request body to update a record in the database. If successful, it returns
 * a 200 status with a JSON message indicating the record was updated. In case
 * of an error, it returns a 500 status with an error message.
 *
 * @param {NextApiRequest} req - The API request object containing the record
 * details in the body.
 * @param {NextApiResponse} res - The API response object used to return the
 * status and JSON payload to the client.
 */
const updateRecord = async (req: NextApiRequest, res: NextApiResponse) => {
  const {id , value,  studentId,  intervalId } = req.body;
  try {
    const record = await Record.findByPk(id as string);
    if (!record) return res.status(404).json({ message: 'Record not found' });

    await record.update({ value, studentId, intervalId });
    res.status(200).json({ message: 'Record updated' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating record', error });
  }
};

/**
 * Handles DELETE requests to delete a record.
 *
 * This function deletes a record from the database using the record ID
 * provided in the query string. If the record is found and deleted
 * successfully, a 200 status is returned with a JSON payload containing
 * a success message. If the record is not found, a 404 status is returned
 * with an error message. If an error occurs during the deletion, a 500
 * status is returned with an error message.
 *
 * @param {NextApiRequest} req - The API request object, expected to contain
 * the record ID in the query.
 * @param {NextApiResponse} res - The API response object used to return the
 * status and JSON payload to the client.
 */
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

/**
 * Handles API requests to the records endpoint.
 *
 * This function checks the request method and calls the appropriate handler
 * function. If the method is not supported, it returns a 405 status with an
 * "Allow" header listing the supported methods.
 *
 * @param {NextApiRequest} req - The API request object.
 * @param {NextApiResponse} res - The API response object.
 * @returns {Promise<void>} Sends a JSON response containing the result of the
 * handler function or an error message.
 */
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
