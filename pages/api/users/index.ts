import { NextApiRequest, NextApiResponse } from 'next';
import User from '@/models/user.model';
import bcrypt from 'bcryptjs';
import { serialize } from 'cookie';
import jwt from 'jsonwebtoken';
import checkToken from '../middleware/index';

const SECRET_KEY = process.env.JWT_SECRET_KEY || 'no-secret-here-default-app-school-secret';

/**
 * Handles login requests.
 *
 * @param {NextApiRequest} req - The API request object containing the email and password in the body.
 * @param {NextApiResponse} res - The API response object.
 * @returns {Promise<void>} Sends a JSON response with a valid JWT token or an error message.
 */
const login = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;
  try {
    // Find the user in the database
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare the password with the stored hash
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user.id, email: user.email }, SECRET_KEY, { expiresIn: '6h' });

    // Set the token as a cookie
    res.setHeader('Set-Cookie', serialize('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 6 * 60 * 60, // 6 hours
      path: '/',
    }));

    //Save token to the database
    user.auth_token = token;
    await user.save();

    // Return token to caller
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};

/**
 * Logs out the user by removing the authentication token from the database
 * and the cookies in the response. If the user is not found, it silently
 * proceeds without making changes. Upon successful logout, a 200 status
 * is returned with a JSON payload containing a success message.
 *
 * @param {NextApiRequest} req - The API request object, expected to contain
 * the authenticated user's information.
 * @param {NextApiResponse} res - The API response object used to return the
 * status and JSON payload to the client.
 * @returns {Promise<void>} Sends a JSON response indicating successful logout.
 */
const logout = async (req: NextApiRequest, res: NextApiResponse) => {

   //Remove token from the database
   const email = req.user?.email;

  if (email) {
    const user = await User.findOne({ where: { email } });
     user.auth_token = null;
     await user.save();
   }

  res.setHeader('Set-Cookie', serialize('token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: -1, // Expire the cookie immediately
    path: '/',
  }));

  res.status(200).json({ message: 'Logged out successfully' });
};

/**
 * Handles API requests to the users endpoint.
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
    case 'POST':
      return login(req, res);
    case 'DELETE':
      checkToken(req, res, async () => {
        return logout(req, res);
      });
    default:
      res.setHeader('Allow', ['POST', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
