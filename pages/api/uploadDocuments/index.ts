import { NextApiRequest, NextApiResponse } from 'next';
import { saveFile, parseForm } from '@/lib/fileSaving';
import Document from '@/models/document.model';
import checkToken from '../middleware';
export const config = {
  api: {
    bodyParser: false,
  },
};

/**
 * Handles POST requests to the /api/documents endpoint.
 *
 * This function creates a new document in the database using the provided
 * form data, which includes the document's name, classId, and file. The file
 * is saved on the server, and its path is stored in the database. If the
 * creation is successful, a 201 status is returned with the newly created
 * document as a JSON payload. If an error occurs during the request, a 500
 * status is returned with a JSON payload containing an error message.
 *
 * @param {NextApiRequest} req - The incoming request object, expected to contain
 * form data with fields 'name' and 'classId', and a file under the key 'file'.
 * @param {NextApiResponse} res - The response object used to return the status
 * and JSON payload to the client.
 */
const createDocument = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { fields, files }: any = await parseForm(req);
    const { name ,classId } = fields;
    const file = files.file[0];
    const filePath = await saveFile(file, file.originalFilename);
    const [fileName] = name;
    const [classIdExtracted] = classId;

    const newDocument = await Document.create({  name : fileName , classId: classIdExtracted, filePath, sharableLink: "" });

    res.status(201).json(newDocument);
  } catch (error) {
    console.error('Error creating document:', error);
    res.status(500).json({ message: 'Error creating document', error });
  }
};


/**
 * Handles API requests to the documents endpoint.
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
    case 'POST':
      return createDocument(req, res);
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
});
}
