import { IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';

export const saveFile = async (file: any, filename: string) => {
  const timestamp = Date.now();
  const extension = path.extname(filename);
  const baseName = path.basename(filename, extension);
  const newFilename = `${baseName}-${timestamp}${extension}`;

  const data = fs.readFileSync(file.filepath);
  const uploadDir = path.join(process.cwd(), 'uploadedDocuments');

  // Ensure the upload directory exists
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  const filePath = path.join(uploadDir, newFilename);
  fs.writeFileSync(filePath, data);
  fs.unlinkSync(file.filepath); // Remove the temporary file

  return filePath;
};

export const parseForm = (req: any) => {
  return new Promise((resolve, reject) => {
    const form = new IncomingForm({
      keepExtensions: true,
      multiples: false,
    });

    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err);
      } else {
        resolve({ fields, files });
      }
    });
  });
};
