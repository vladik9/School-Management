import { NextApiRequest, NextApiResponse } from 'next';
import Class from '@/models/class.model';
import Test from '@/models/test.model';
import Student from '@/models/student.model';
import Document from '@/models/document.model';
import Interval from '@/models/interval.model';
import checkToken from '../middleware';
import Record from '@/models/record.model';



function isBetterRecord(oldRecord: any, newRecord: any) {
  if (!oldRecord) return true; // If no record yet, new one is better by default
  // Compare performanceScores, bigger is better
  return Number(newRecord.performanceScore) > Number(oldRecord.performanceScore);
}

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
      //    We'll store best record in a dictionary keyed by studentGeneratedId.
      const bestRecordsByStudent = {};

      for (const record of records) {
        // Compute performanceScore
        // For demonstration, let's assume numeric data => record.value / performance.barem
        // You might need to adapt if it's time-based, etc.
        let performanceScore = null;

        // Simple numeric scenario:
        if (performance.baremType === 1 || performance.baremType === 2 || performance.baremType === 4) {
          // Convert to number for safety
          const numericValue = Number(record.value);
          const numericBarem = Number(performance.barem);
          if (!isNaN(numericValue) && !isNaN(numericBarem)) {
            performanceScore = numericValue / numericBarem;
          }
        }
        if (performance.baremType === 3) {
          const [rM, rS] = record.value.split(':').map(Number);
          const [bM, bS] = performance.barem.split(':').map(Number);

          // Convert them to total seconds
          const totalResultSeconds = rM * 60 + rS;
          const totalBaremSeconds = bM * 60 + bS;

          // Calculate the difference
          const difference = totalResultSeconds / totalBaremSeconds;
          performanceScore = record.value;
          // Assign the performance score
          performanceScore = Number(difference.toFixed(2));
        }
        const currentStudentId = record.studentGeneratedId;

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
        if (!bestRecordsByStudent[currentStudentId] ||
          isBetterRecord(bestRecordsByStudent[currentStudentId], recordObj)) {
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
      boys.sort((a, b) => b.performanceScore - a.performanceScore);
      girls.sort((a, b) => b.performanceScore - a.performanceScore);

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

// const getPerformancesWithDetailsFirstFive = async (performances: any) => {
//   const performancesWithDetails = await Promise.all(
//     performances.map(async (performance: any) => {
//       const intervals = await Interval.findAll({
//         where: { testId: performance.testId },
//       });
//       const records = await Record.findAll({
//         where: { intervalId: intervals.map((interval) => interval.id) },
//         attributes: ['id', 'studentId', 'studentGeneratedId', 'value', 'intervalId'],
//       });

//       // Map records to their respective intervals and divide them into intervalB and intervalF
//       const intervalsWithRecords = intervals.map((interval) => {
//         const intervalB = records
//           .filter((record) => record.intervalId === interval.id && record.studentGeneratedId.toString().startsWith('B'))
//           .map((record) => ({
//             id: record.id,
//             studentId: record.studentId,
//             studentGeneratedId: record.studentGeneratedId,
//             score: record.value,
//             intervalId: record.intervalId,
//             performanceScore: record.value / performance.barem
//           }))
//           .sort((a, b) => b.performanceScore - a.performanceScore) // Sort by performanceScore descending
//           .slice(0, 5); // Take top 5

//         const intervalF = records
//           .filter((record) => record.intervalId === interval.id && record.studentGeneratedId.toString().startsWith('F'))
//           .map((record) => ({
//             id: record.id,
//             studentId: record.studentId,
//             studentGeneratedId: record.studentGeneratedId,
//             score: record.value,
//             intervalId: record.intervalId,
//             performanceScore: record.value / performance.barem
//           }))
//           .sort((a, b) => b.performanceScore - a.performanceScore) // Sort by performanceScore descending
//           .slice(0, 5); // Take top 5

//         return {
//           ...interval.toJSON(),
//           intervalB,
//           intervalF
//         };
//       });

//       return {
//         ...performance,
//         intervals: intervalsWithRecords,
//       };
//     })
//   );
//   return performancesWithDetails;
// };

// Handle GET (read all schools)
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
            attributes: ['id', 'name', 'baremType', 'barem'], // Select relevant fields
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
            barem: test.barem

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



// Handle POST (create school)
const createClass = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { name, teacher, yearId } = req.body;

    const newClass = await Class.create({ name, teacher, yearId });
    res.status(201).json(newClass);
  } catch (error) {
    res.status(500).json({ message: 'Error creating class', error });
  }
};

// Handle PUT (update school)
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

// Handle DELETE (delete school)
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
