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

    res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
    res.setHeader('Content-Type', 'application/octet-stream');

    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  } catch (error) {
    console.error('Error fetching document:', error);
    res.status(500).json({ message: 'Error fetching document', error });
  }
};

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
