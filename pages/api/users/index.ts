import { NextApiRequest, NextApiResponse } from 'next';
import User from '@/models/user.model';
import bcrypt from 'bcryptjs';
import { serialize } from 'cookie';
import jwt from 'jsonwebtoken';
import checkToken from '../middleware/index';

const SECRET_KEY = process.env.JWT_SECRET_KEY || 'no-secret-here-default-app-school';

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
