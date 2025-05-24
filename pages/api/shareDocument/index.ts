import { NextApiRequest, NextApiResponse } from 'next';
import Document from '@/models/document.model';
import fs from 'fs';
import path from 'path';

/**
 * Handles GET requests to the /api/shareDocument endpoint.
 *
 * This function is used to fetch a document from the database using a share link.
 * It expects the shareLink to be provided as a query parameter.
 * If the document is found, it is returned as an attachment with the correct Content-Type and
 * Content-Disposition headers.
 * If the document is not found, a 404 status is returned with a JSON payload containing an
 * error message.
 * If an error occurs during the request, a 500 status is returned with a JSON payload containing
 * an error message.
 */
const getDocumentByShareLink = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { shareLink } = req.query;
    if (!shareLink) {
      return res.status(400).json({ message: 'Document shareLink is required for the given documents' });
    }
    const document = await Document.findOne({ where: { sharableLink: shareLink } });

    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    const filePath = document.filePath;
    const fileName = path.basename(filePath);
     res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
     res.setHeader('Content-Type', 'application/octet-stream');

        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(res);
  } catch (error) {
    console.error('Error fetching document:', error);
    res.status(500).json({ message: 'Error fetching document', error });
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
  switch (req.method) {
    case 'GET':
      return getDocumentByShareLink(req, res);
         default:
      res.setHeader('Allow', [  'GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
