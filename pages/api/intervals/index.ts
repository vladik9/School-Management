import { NextApiRequest, NextApiResponse } from 'next';
import Interval from '@/models/interval.model';
import checkToken from '../middleware';

/**
 * Handles GET requests to the /api/intervals endpoint.
 *
 * This function is used to fetch all intervals associated with a given testId.
 * It expects the testId to be provided as a query parameter.
 * If the testId is not provided, a 400 status is returned with a JSON payload
 * containing an error message.
 * If intervals are found, they are returned as a JSON array.
 * If no intervals are found, an empty array is returned.
 * If an error occurs during the request, a 500 status is returned with a JSON
 * payload containing an error message.
 */
const getInterval = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { testId } = req.query;
    // Ensure testId is provided
    if (!testId) {
      return res.status(400).json({ message: 'Test id is required' });
    }

    // Query the 'Interval' table to find all years for the given schoolId
    const interval = await Interval.findAll({
      where: { testId },  // Use `where` to filter by schoolId
    });

    // If no years found, return 404
    if (!interval || interval.length === 0) {
      return res.status(200).json([]);
    }

    // Return the found years
    res.status(200).json(interval);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching test', error });
  }
};

/**
 * Handles POST requests to the /api/intervals endpoint.
 *
 * This function is used to create a new interval associated with a given testId.
 * It expects the testId to be provided in the request body.
 * If the testId is not provided, a 400 status is returned with a JSON payload
 * containing an error message.
 * If the interval is created successfully, a 201 status is returned with the
 * newly created interval as a JSON payload.
 * If an error occurs during the request, a 500 status is returned with a JSON
 * payload containing an error message.
 */
const createInterval = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { testId } = req.body;
    const newInterval = await Interval.create({ testId });
    res.status(201).json(newInterval);
  } catch (error) {
    res.status(500).json({ message: 'Error creating test', error });
  }
};

/**
 * Handles PUT requests to the /api/intervals endpoint.
 *
 * This function updates an existing interval in the database. It expects
 * the interval ID to be provided in the query parameters and the new name
 * to be provided in the request body. If the interval is found and updated
 * successfully, a JSON response containing the updated interval is returned
 * with a 200 status. If the interval is not found, a 404 status is returned
 * with an error message. If an error occurs during the update, a 500 status
 * is returned with an error message.
 *
 * @param {NextApiRequest} req - The incoming request object, expected to contain
 * the interval ID in the query and the new name in the body.
 * @param {NextApiResponse} res - The response object used to return the status
 * and JSON payload to the client.
 */
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

/**
 * Handles DELETE requests to the /api/intervals endpoint.
 *
 * This function deletes an existing interval in the database. It expects
 * the interval ID to be provided in the query parameters. If the interval
 * is found and deleted successfully, a JSON response containing a success
 * message is returned with a 200 status. If the interval is not found,
 * a 404 status is returned with an error message. If an error occurs during
 * the deletion, a 500 status is returned with an error message.
 *
 * @param {NextApiRequest} req - The incoming request object, expected to contain
 * the interval ID in the query.
 * @param {NextApiResponse} res - The response object used to return the status
 * and JSON payload to the client.
 */
const deleteInterval = async (req: NextApiRequest, res: NextApiResponse) => {

  const { id } = req.query;

  try {
    const interval = await Interval.findByPk(id as string);
    if (!interval) return res.status(404).json({ message: 'Interval not found' });

    await interval.destroy();
    res.status(200).json({ message: 'Interval deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting interval', error });
  }
};

/**
 * Handles API requests to the /api/intervals endpoint.
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
});
}
