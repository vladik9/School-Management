import { NextApiRequest, NextApiResponse } from 'next';
import Test from '@/models/test.model';
import checkToken from '../middleware/index';

/**
 * Handles a GET request to fetch tests for the given classId.
 *
 * It expects the classId to be provided in the query string.
 * If the classId is not provided, it returns a 400 status with an error message.
 * If no tests are found for the given classId, it returns an empty array.
 * Otherwise, it returns the list of tests with their associated test data.
 */
const getTest = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { classId } = req.query;
    // Ensure classId is provided
    if (!classId) {
      return res.status(400).json({ message: 'Test id is required' });
    }

    // Query the 'Test' table to find all years for the given classId
    const discipline = await Test.findAll({
      where: { classId },  // Use `where` to filter by classId
    });

    // If no tests found, return 404
    if (!discipline || discipline.length === 0) {
      return res.status(200).json({ message: 'Test not found for the given classId' });
    }

    // Return the found tests
    res.status(200).json(discipline);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching test', error });
  }
};

/**
 * Handles a POST request to create a new test.
 *
 * It expects the following to be provided in the request body:
 * - name: The name of the test.
 * - baremType: The type of barem to use for the test.
 * - barem: The value of the barem to use for the test.
 * - classId: The ID of the class to associate with the new test.
 * If any of these are missing, a 400 status is returned with an error message.
 * If a test with the given name already exists for the given classId, a 409 status is returned with an error message.
 * If the test is created successfully, a 201 status is returned with the newly created test as a JSON payload.
 * If an error occurs during the request, a 500 status is returned with a JSON payload containing an error message.
 */
const createTest = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { name, baremType, barem_B, barem_F, classId } = req.body;
    const newDiscipline = await Test.create({name, baremType, barem_B, barem_F, classId });
    res.status(201).json(newDiscipline);
  } catch (error) {
    res.status(500).json({ message: 'Error creating test', error });
  }
};

/**
 * Handles a PUT request to update a test.
 *
 * It expects the following to be provided:
 * - id: The ID of the test to update, provided as a query parameter.
 * - name: The new name of the test, provided in the request body.
 * If either of these are missing, a 400 status is returned with an error message.
 * If the test is found and updated successfully, a 200 status is returned with the updated test as a JSON payload.
 * If the test is not found, a 404 status is returned with an error message.
 * If an error occurs during the request, a 500 status is returned with a JSON payload containing an error message.
 */
const updateTest = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const { name } = req.body;

  try {
    const year = await Test.findByPk(id as string);
    if (!year) return res.status(404).json({ message: 'Test not found' });

    year.name = name || year.name;
    await year.save();
    res.status(200).json(year);
  } catch (error) {
    res.status(500).json({ message: 'Error updating test', error });
  }
};

/**
 * Handles a DELETE request to delete a test.
 *
 * It expects the id of the test to be deleted to be provided as a query parameter.
 * If the test is found and deleted successfully, a 200 status is returned with a success message.
 * If the test is not found, a 404 status is returned with an error message.
 * If an error occurs during the request, a 500 status is returned with a JSON payload containing an error message.
 */
const deleteTest = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  try {
    const year = await Test.findByPk(id as string);
    if (!year) return res.status(404).json({ message: 'Test not found' });

    await year.destroy();
    res.status(200).json({ message: 'Test deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting test', error });
  }
};

/**
 * Handles API requests to the tests endpoint.
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
      return getTest(req, res);
    case 'POST':
      return createTest(req, res);
    case 'PUT':
      return updateTest(req, res);
    case 'DELETE':
      return deleteTest(req, res);
    default:
      res.setHeader('Allow', ['POST','GET','PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
  });
}
