import { NextApiRequest, NextApiResponse } from 'next';
import { getUserById, updateUserById } from '@/models/userModel';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query;

  if (req.method === 'GET') {
    const user = await getUserById(userId as string);
    res.status(200).json(user);
  } else if (req.method === 'PUT') {
    const updatedUser = await updateUserById(userId as string, req.body);
    res.status(200).json(updatedUser);
  } else {
    res.setHeader('Allow', ['GET', 'PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}