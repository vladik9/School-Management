import { NextApiRequest, NextApiResponse } from 'next';
import Class from '@/models/class.model';
import Test from '@/models/test.model';
import Student from '@/models/student.model';
import Document from '@/models/document.model';
import Interval from '@/models/interval.model';
import checkToken from '../middleware';
import Record from '@/models/record.model';



/**
 * Compares two records and returns whether the newRecord is better than the oldRecord.
 * A record is considered better if its performanceScore is greater than the oldRecord's.
 * If oldRecord is null, newRecord is considered better by default.
 * @param {object} oldRecord - The existing record to compare against. Can be null.
 * @param {object} newRecord - The new record to compare.
 * @returns {boolean} Whether the newRecord is better than the oldRecord.
 */
function isBetterRecord(oldRecord: any, newRecord: any) {
  if (!oldRecord) return true;
  return Number(newRecord.performanceScore) > Number(oldRecord.performanceScore);
}

/**
 * Given a list of performances, returns a new list with added details.
 * The added details are:
 * - best record for each student (by performanceScore)
 * - separated by sex (B / F)
 * - sorted by performanceScore descending
 * - limited to top 5 records
 *
 * @param {object[]} performances - The list of performances to process.
 * @returns {Promise<object[]>} The list of performances with added details.
 */
const getPerformancesWithDetails = async (performances: any) => {
  return Promise.all(
    performances.map(async (performance: any) => {
      // 1. Get all intervals for the test
      const intervals = await Interval.findAll({
        where: { testId: performance.testId },
      });
      // 2. Get all records for these intervals in one go
      const intervalIds = intervals.map((interval) => interval.id);
      const records = await Record.findAll({
        where: { intervalId: intervalIds },
        attributes: ['id', 'studentId', 'studentGeneratedId', 'value', 'intervalId'],
      });

      // 3. Compute performanceScore and group by student
      // We'll store best record in a dictionary keyed by studentGeneratedId.
      const bestRecordsByStudent: { [key: string]: any } = {};

      for (const record of records) {
        // Determine if student is boy or girl
        const currentStudentId = record.studentGeneratedId;
        const isBoy = currentStudentId.startsWith('B');
        const isGirl = currentStudentId.startsWith('F');

        // Pick barem based on sex
        let barem = null;
        if (isBoy && performance.barem_B) {
          barem = performance.barem_B;
        } else if (isGirl && performance.barem_F) {
          barem = performance.barem_F;
        }

        // Compute performanceScore
        let performanceScore = null;

        // Simple numeric scenario:
        if (performance.baremType === 1 || performance.baremType === 2 || performance.baremType === 4) {
          const numericValue = Number(record.value);
          const numericBarem = Number(barem);
          if (!isNaN(numericValue) && !isNaN(numericBarem)) {
            performanceScore = (numericValue / numericBarem).toFixed(2);
          }
        }
        if (performance.baremType === 3) {
          const [rM, rS] = record.value.split(':').map(Number);
          const [bM, bS] = String(barem).split(':').map(Number);

          // Convert them to total seconds
          const totalResultSeconds = rM * 60 + rS;
          const totalBaremSeconds = bM * 60 + bS;

          // Calculate the difference
          const difference = totalResultSeconds / totalBaremSeconds;
          performanceScore = Number(difference.toFixed(2));
        }

        // Construct a partial object for the student's record:
        const recordObj = {
          id: record.id,
          studentId: record.studentId,
          studentGeneratedId: currentStudentId,
          intervalId: record.intervalId,
          score: record.value,
          performanceScore,
        };

        // 4. Check if this is better than the best we have so far
        if (
          !bestRecordsByStudent[currentStudentId] ||
          isBetterRecord(bestRecordsByStudent[currentStudentId], recordObj)
        ) {
          bestRecordsByStudent[currentStudentId] = recordObj;
        }
      }

      // 5. Separate best records by sex (B / F)
      const boys: Array<object> = [];
      const girls: Array<object> = [];

      Object.keys(bestRecordsByStudent).forEach((studentKey) => {
        const bestRec = bestRecordsByStudent[studentKey];
        if (studentKey.startsWith('B')) {
          boys.push(bestRec);
        } else if (studentKey.startsWith('F')) {
          girls.push(bestRec);
        }
      });

      // Sort boys and girls by performanceScore descending
      boys.sort((a: any, b: any) => b.performanceScore - a.performanceScore);
      girls.sort((a: any, b: any) => b.performanceScore - a.performanceScore);

      // Limit to top 5 records
      const topBoys = boys.slice(0, 5);
      const topGirls = girls.slice(0, 5);

      // 6. Return aggregated data for this single test
      return {
        ...performance,
        boys: topBoys,
        girls: topGirls,
      };
    })
  );
};


/**
 * Handles the GET request to fetch classes for the specified yearId.
 *
 * This function validates the provided yearId, fetches all classes
 * associated with that yearId, and retrieves related tests, students,
 * and documents for each class. It also processes performance details
 * for each test associated with the classes.
 *
 * @param {NextApiRequest} req - The API request object.
 * @param {NextApiResponse} res - The API response object.
 * @returns {Promise<void>} Sends a JSON response containing the list of classes with details.
 * If yearId is not provided, it returns a 400 status with an error message.
 * If no classes are found for the provided yearId, it returns an empty array.
 * Handles any errors by logging them and returning a 500 status with an error message.
 */
const getClasses = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { yearId } = req.query;

    // Validate yearId
    if (!yearId) {
      return res
        .status(400)
        .json({ message: 'YearId is required for the given classes' });
    }

    // Fetch all classes for the given yearId
    const classes = await Class.findAll({
      where: { yearId },
    });

    // If no classes found, return 404
    if (!classes || classes.length === 0) {
      return res.status(200).json([]);
    }

    // Fetch students and tests for each class
    const classesWithDetails = await Promise.all(
      classes.map(async (classData) => {
        const [tests, students, documents] = await Promise.all([
          Test.findAll({
            where: { classId: classData.id }, // Use classId to fetch related tests
            attributes: ['id', 'name', 'baremType', 'barem_B', 'barem_F'], // Select relevant fields
          }),
          Student.findAll({
            where: { classId: classData.id }, // Use classId to fetch related students
            attributes: ['id', 'name', 'studentId'], // Select relevant fields
          }),
          Document.findAll({
            where: { classId: classData.id }, // Use classId to fetch related documents
            attributes: ['id', 'name'], // Select relevant fields
          }),
        ]);

        const performancesWithTest = tests.map((test) => {
          return {
            testId: test.id,
            testName: test.name,
            baremType: test.baremType,
            barem_B: test.barem_B,
            barem_F: test.barem_F

          };
        });

        const performances = await getPerformancesWithDetails(performancesWithTest);

        return {
          ...classData.toJSON(), // Convert Sequelize instance to plain object
          tests,
          students,
          documents,
          performances,
        };
      })
    );

    // Return the result
    res.status(200).json(classesWithDetails);
  } catch (error) {
    console.error('Error in getClasses:', error);
    res.status(500).json({ message: 'Error fetching classes', error });
  }
};

/**
 * Handles the POST request to create a new class.
 *
 * This function extracts the name, teacher, and yearId from the request body
 * to create a new class in the database. If successful, it returns the newly
 * created class with a 201 status. In case of an error, it logs the error
 * and returns a 500 status with an error message.
 *
 * @param {NextApiRequest} req - The API request object.
 * @param {NextApiResponse} res - The API response object.
 * @returns {Promise<void>} Sends a JSON response containing the created class or an error message.
 */
const createClass = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { name, teacher, yearId } = req.body;

    const newClass = await Class.create({ name, teacher, yearId });
    res.status(201).json(newClass);
  } catch (error) {
    res.status(500).json({ message: 'Error creating class', error });
  }
};

/**
 * Handles the PUT request to update a class.
 *
 * This function extracts the name and id from the request body and query string
 * to update the class in the database. If successful, it returns the updated
 * class with a 200 status. In case of an error, it logs the error and returns
 * a 500 status with an error message.
 *
 * @param {NextApiRequest} req - The API request object.
 * @param {NextApiResponse} res - The API response object.
 * @returns {Promise<void>} Sends a JSON response containing the updated class or an error message.
 */
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

/**
 * Handles the DELETE request to delete a class.
 *
 * This function extracts the id from the request query and uses it to delete
 * the class from the database. If successful, it returns a 200 status with a
 * success message. In case of an error, it logs the error and returns a 500
 * status with an error message.
 *
 * @param {NextApiRequest} req - The API request object.
 * @param {NextApiResponse} res - The API response object.
 * @returns {Promise<void>} Sends a JSON response containing a success message or an error message.
 */
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

/**
 * Handles API requests to the classes endpoint.
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
        return getClasses(req, res);
      case 'POST':
        return createClass(req, res);
      case 'PUT':
        return updateClass(req, res);
      case 'DELETE':
        return deleteClass(req, res);
      default:
        res.setHeader('Allow', ['POST', 'GET', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  });
}
