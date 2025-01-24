import { NextApiRequest, NextApiResponse } from 'next';
import Year from '../../../models/year.model';
import checkToken from '../middleware/index';

/**
 * Handles a GET request to fetch years for the given schoolId.
 *
 * It expects the schoolId to be provided in the query string.
 * If the schoolId is not provided, it returns a 400 status with an error message.
 * If no years are found for the given schoolId, it returns an empty array.
 * Otherwise, it returns the list of years.
 */
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

/**
 * Handles a POST request to create a new year.
 *
 * It expects the following data to be provided in the request body:
 * - `year`: The name of the year to be created.
 * - `schoolId`: The ID of the school to create the year for.
 *
 * If the year is successfully created, it returns the newly created year with a 201 status.
 * If an error occurs during the creation, it returns a 500 status with an error message.
 */
const createYear = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const {year: name, schoolId } = req.body;
    const newYear = await Year.create({name, schoolId });
    res.status(201).json(newYear);
  } catch (error) {
    res.status(500).json({ message: 'Error creating year', error });
  }
};

/**
 * Handles a PUT request to update a year.
 *
 * It expects the following properties in the request body: name.
 * The request body is expected to be a JSON object.
 * It also expects the year ID to be provided in the query string.
 * If successful, it returns the updated year with a 200 status.
 * In case of an error, it returns a 500 status with an error message.
 *
 * @param {NextApiRequest} req - The API request object containing the year details in the body.
 * @param {NextApiResponse} res - The API response object used to return the status and JSON payload to the client.
 */
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

/**
 * Handles a DELETE request to delete a year.
 *
 * This function expects a year ID to be provided in the query string.
 * It attempts to find and delete the year with the specified ID from the database.
 * If the year is found and deleted successfully, a 200 status is returned with
 * a success message. If the year is not found, a 404 status is returned with
 * an error message. If an error occurs during the deletion process, a 500
 * status is returned with an error message.
 *
 * @param {NextApiRequest} req - The API request object containing the year ID in the query string.
 * @param {NextApiResponse} res - The API response object used to return the status and JSON payload to the client.
 */
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

/**
 * Handles API requests to the /api/years endpoint.
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
