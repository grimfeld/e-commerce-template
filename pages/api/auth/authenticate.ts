import { getUsers } from '@providers/User'
import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'

export default function handler (req: NextApiRequest, res: NextApiResponse<{ token: string } | { error: string }>) {

  const { body: { email, password } } = req

  if (!email || !password) return res.status(400).json({ error: 'Email and password are required' })
  const users = getUsers()
  const user = users.find(u => u.email === email && u.password === password)
  if (!user) return res.status(400).json({ error: 'Email or password is incorrect' })

  if (process.env.JWT_SECRET === undefined) return res.status(500).json({ error: 'JWT_SECRET is not defined' })
  const token = jwt.sign({ id: user.id, admin: user.admin }, process.env.JWT_SECRET)
  return res.status(200).json({ token })
}