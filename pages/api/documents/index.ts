import { NextApiRequest, NextApiResponse } from 'next';
import { saveFile, parseForm } from '@/lib/fileSaving';
import Document from '@/models/document.model';
import fs from 'fs';
import path from 'path';
import checkToken from '../middleware';
export const config = {
  api: {
    bodyParser: false,
  },
};

/**
 * Handles GET requests to the /api/documents endpoint.
 *
 * This function is used to fetch a document from the database and return it to the client.
 * It expects the documentId to be provided as a query parameter.
 * If the document is found, it is returned as an attachment with the correct Content-Type and
 * Content-Disposition headers.
 * If the document is not found, a 404 status is returned with a JSON payload containing an
 * error message.
 * If an error occurs during the request, a 500 status is returned with a JSON payload containing
 * an error message.
 */
const getDocument = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ message: 'DocumentId is required for the given documents' });
    }

    const document = await Document.findByPk(id as string);

    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    const filePath = document.filePath;
    const fileName = path.basename(filePath);

    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${fileName}"`
    );
    res.setHeader('Content-Type', 'application/octet-stream');

    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  } catch (error) {
    console.error('Error fetching document:', error);
    res.status(500).json({ message: 'Error fetching document', error });
  }
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

    const newDocument = await Document.create({  name : fileName , classId: classIdExtracted, filePath });

    res.status(201).json(newDocument);
  } catch (error) {
    console.error('Error creating document:', error);
    res.status(500).json({ message: 'Error creating document', error });
  }
};

  /**
   * Handles DELETE requests to the /api/documents endpoint.
   *
   * This function removes a document from the database using the provided
   * document ID. If the document is not found, a 404 status is returned
   * with a JSON payload containing an error message. If the deletion is
   * successful, a 200 status is returned with a JSON payload containing a
   * message indicating that the document was deleted. If an error occurs during
   * the request, a 500 status is returned with a JSON payload containing an
   * error message.
   *
   * @param {NextApiRequest} req - The incoming request object, expected to contain
   * a document ID as a query parameter.
   * @param {NextApiResponse} res - The response object used to return the status
   * and JSON payload to the client.
   */
const deleteDocument = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  try {
    const document = await Document.findByPk(id as string);
    if (!document) return res.status(404).json({ message: 'Document not found' });

    await document.destroy();
    res.status(200).json({ message: 'Document deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting document', error });
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
    case 'GET':
      return getDocument(req, res);
    case 'POST':
      return createDocument(req, res);
    case 'DELETE':
      return deleteDocument(req, res);
    default:
      res.setHeader('Allow', ['POST', 'GET', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
});
}
