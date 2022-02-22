import { getUsers } from '@providers/User'
import { NextApiRequest, NextApiResponse } from 'next'
import { User } from 'types/User'
export default function handler (req: NextApiRequest, res: NextApiResponse<User[]>) {
  const users = getUsers()
  return res.status(200).json(users)
}