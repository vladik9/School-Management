import { NextApiRequest, NextApiResponse } from 'next';
 import { saveFile } from '@/lib/utils';

import Document from '@/models/document.model';

// Handle GET (read all documents)

const getDocuments = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const {  classId } = req.query;

    // Validate classId
    if (!classId) {
      return res
        .status(400)
        .json({ message: 'ClassId is required for the given documents' });
    }

    // Fetch all documents for the given classId
    const documents = await Document.findAll({
      where: {  classId },
    });

    // If no documents found, return 404
    if (!documents || documents.length === 0) {
      return res.status(200).json([]);
    }
    // Return the result
    res.status(200).json(documents);
  } catch (error) {
    console.error('Error in getClasses:', error);
    res.status(500).json({ message: 'Error fetching classes', error });
  }
};



// Handle POST (create school)
const createDocument = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { name, classId } = req.body;
    const filePath = saveFile(req.body.file, name);

    const newDocument = await Document.create({ name, classId, filePath });
    res.status(201).json(newDocument);
  } catch (error) {
    res.status(500).json({ message: 'Error creating document', error });
  }
};


// Handle DELETE (delete school)
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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return getDocuments(req, res);
    case 'POST':
      return createDocument(req, res);
    case 'DELETE':
      return deleteDocument(req, res);
    default:
      res.setHeader('Allow', ['POST','GET', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
