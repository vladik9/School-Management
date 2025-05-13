import { IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';

/**
 * Saves the provided file to the server.
 *
 * The file is saved in the directory specified by the `UPLOAD_DIR` environment variable,
 * or in the `uploadedDocuments` directory in the root of the project if `UPLOAD_DIR` is not set.
 *
 * The file is saved with the same extension as the original filename, but with a timestamp
 * appended to the filename to ensure uniqueness.
 *
 * @param file The file to save. This is expected to be an object with a `filepath` property
 * containing the path to the temporary file.
 * @param filename The original filename of the file.
 * @returns The path to the saved file.
 */
export const saveFile = async (file: any, filename: string) => {
  const timestamp = Date.now();
  const extension = path.extname(filename).toLowerCase();
  const baseName = path.basename(filename, extension).replace(/[^a-z0-9_\-.]/gi, '_');
  const newFilename    = `${baseName}_${timestamp}${extension}`;


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

/**
 * Parses a multipart/form-data request and returns a promise that resolves with an object
 * containing the fields and files from the request.
 *
 * @param req The request object.
 * @returns A promise that resolves with an object containing the fields and files from the request.
 */
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
