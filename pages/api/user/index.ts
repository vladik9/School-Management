import { NextApiRequest, NextApiResponse } from 'next';
import User from '@/models/user.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';

// Helper function to generate JWT token
const generateToken = (userId: number, email: string) => {
  return jwt.sign(
    { userId, email },
    process.env.JWT_SECRET as string, // Secret key should be stored in an env variable
    { expiresIn: '1h' } // Token expires in 1 hour
  );
};

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

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};

const logout = (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader('Set-Cookie', cookie.serialize('token', '', {
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
      return logout(req, res);
    default:
      res.setHeader('Allow', ['POST', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
