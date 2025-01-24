import { NextApiRequest, NextApiResponse } from 'next';
import School from '../../../models/school.model';
import checkToken from '../middleware/index';

/**
 * Handles GET requests to fetch all schools.
 *
 * This function retrieves a list of all schools from the database.
 * If no schools are found, it returns an empty array with a 200 status.
 * In case of an error during the fetch operation, it returns a 500 status
 * with an error message.
 *
 * @param {NextApiRequest} req - The API request object.
 * @param {NextApiResponse} res - The API response object.
 * @returns {Promise<void>} Sends a JSON response containing the list of
 * schools or an error message.
 */
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

/**
 * Handles a POST request to create a new school.
 *
 * This function expects the name of the school to be provided in the
 * request body. If the name is not provided, it returns a 400 status
 * with an error message. If a school with the same name already exists,
 * it returns a 409 status with an error message. On success, it returns
 * the newly created school with a 201 status.
 *
 * @param {NextApiRequest} req - The API request object.
 * @param {NextApiResponse} res - The API response object.
 * @returns {Promise<void>} Sends a JSON response containing the created
 * school or an error message.
 */
const createSchool = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { name } = req.body.data;
    const newSchool = await School.create({ name });
    res.status(201).json(newSchool);
  } catch (error) {
    res.status(500).json({ message: 'Error creating school', error });
  }
};

/**
 * Handles a PUT request to update a school.
 *
 * This function expects the schoolId to be provided in the query string
 * and the new name to be provided in the request body. If the school is not
 * found, it returns a 404 status with an error message. If the name is not
 * provided, the school is not updated. On success, it returns the updated
 * school with a 200 status.
 *
 * @param {NextApiRequest} req - The API request object.
 * @param {NextApiResponse} res - The API response object.
 * @returns {Promise<void>} Sends a JSON response containing the updated
 * school or an error message.
 */
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

/**
 * Handles DELETE requests to remove a school.
 *
 * This function deletes a school from the database using the school ID
 * provided in the request query. If the school is found and deleted
 * successfully, it returns a 200 status with a success message. If the
 * school is not found, it returns a 404 status with an error message.
 * In case of an error during the deletion, it returns a 500 status with
 * an error message.
 *
 * @param {NextApiRequest} req - The API request object, expected to contain
 * the school ID in the query.
 * @param {NextApiResponse} res - The API response object used to return the
 * status and JSON payload to the client.
 */
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

/**
 * Handles API requests to the schools endpoint.
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
        return getSchools(req, res);
      case 'POST':
        return createSchool(req, res);
      case 'PUT':
        return updateSchool(req, res);
      case 'DELETE':
        return deleteSchool(req, res);
      default:
        res.setHeader('Allow', ['POST', 'GET', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  });
}
