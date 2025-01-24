import { NextApiRequest, NextApiResponse } from 'next';
import Student from '@/models/student.model';
import checkToken from '../middleware';

  /**
   * Handles a GET request to fetch students for the given classId.
   *
   * It expects the classId to be provided in the query string.
   * If the classId is not provided, it returns a 400 status with an error message.
   * If no students are found for the given classId, it returns an empty array.
   * Otherwise, it returns the list of students with their associated student data.
   */
const getStudents = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { classId } = req.query;

    // Validate classId
    if (!classId) {
      return res.status(400).json({ message: 'ClassId is required for the given classes' });
    }

    // Fetch all classes for the given yearId
    const students = await Student.findAll({
      where: {  classId },
    });

    // If no classes found, return 404
    if (!students || students.length === 0) {
      return res.status(200).json( []);
    }

    // Return the result
    res.status(200).json(students);
  } catch (error) {
    console.error("Error in getStudents:", error);
    return res.status(404).json([]);
  }
};



  /**
   * Handles a POST request to create a new student.
   *
   * This function expects the following properties in the request body: name, studentId, classId.
   * The request body is expected to be a JSON object.
   * If successful, it returns the newly created student with a 201 status.
   * In case of an error, it returns a 500 status with an error message.
   *
   * @param {NextApiRequest} req - The API request object containing the student details in the body.
   * @param {NextApiResponse} res - The API response object used to return the status and JSON payload to the client.
   */
const createStudent = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { name, studentId,  classId } = req.body;

    const newStudent = await Student.create({ name, studentId, classId });
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(500).json({ message: 'Error creating student', error });
  }
};

  /**
   * Handles a PUT request to update a student.
   *
   * This function expects the following properties in the request body: name.
   * The request body is expected to be a JSON object.
   * It also expects the student ID to be provided in the query string.
   * If successful, it returns the updated student with a 200 status.
   * In case of an error, it returns a 500 status with an error message.
   *
   * @param {NextApiRequest} req - The API request object containing the student details in the body.
   * @param {NextApiResponse} res - The API response object used to return the status and JSON payload to the client.
   */
const updateStudent = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const { name } = req.body;

  try {
    const newStudent = await Student.findByPk(id as string);
    if (!newStudent) return res.status(404).json({ message: 'Student not found' });

    newStudent.name = name || newStudent.name;
    await newStudent.save();
    res.status(200).json(newStudent);
  } catch (error) {
    res.status(500).json({ message: 'Error updating student', error });
  }
};

  /**
   * Handles a DELETE request to delete a student.
   *
   * This function expects the student ID to be provided in the query string.
   * If successful, it returns a 200 status with a JSON payload containing a success message.
   * In case of an error, it returns a 500 status with an error message.
   *
   * @param {NextApiRequest} req - The API request object containing the student ID in the query string.
   * @param {NextApiResponse} res - The API response object used to return the status and JSON payload to the client.
   */
const deleteStudent = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  console.log("removing", id);
  try {
    const student = await Student.findByPk(id as string);
    if (!student) return res.status(404).json({ message: 'Student not found' });

    await student.destroy();
    res.status(200).json({ message: 'Student deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting student', error });
  }
};

  /**
   * Handles API requests to the /api/students endpoint.
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
      return getStudents(req, res);
    case 'POST':
      return createStudent(req, res);
    case 'PUT':
      return updateStudent(req, res);
    case 'DELETE':
      return deleteStudent(req, res);
    default:
      res.setHeader('Allow', ['POST','GET','PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
  });

}
