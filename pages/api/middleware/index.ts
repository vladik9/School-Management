import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
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
