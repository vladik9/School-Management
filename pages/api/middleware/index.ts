import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
/**
 * Verifies the authentication token in the request cookies.
 * If the token is valid, it adds the decoded user to the request object.
 * If the token is invalid, it sends a 401 status with an "Unauthorized" message.
 *
 * @function
 * @param {NextApiRequest} req - The API request object.
 * @param {NextApiResponse} res - The API response object.
 * @param {Function} next - The next middleware or route handler.
 */
const checkToken = (req: NextApiRequest, res: NextApiResponse, next: Function) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
    req.user = decoded;

  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  next();
};
export default checkToken;
