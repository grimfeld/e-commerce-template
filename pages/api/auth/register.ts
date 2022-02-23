import jwt from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from 'next'
import { register } from '@providers/User'

export default function handleRegistration (req: NextApiRequest, res: NextApiResponse<{ token: string } | { error: string }>) {
  try {
    const { body: { username, email, password }, method } = req

    if (method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
    const user = register(username, email, password)

    if (process.env.JWT_SECRET === undefined) return res.status(500).json({ error: 'JWT_SECRET is not defined' })
    const token = jwt.sign({ id: user.id, admin: user.admin }, process.env.JWT_SECRET)
    return res.status(200).json({ token })

  } catch (error) {
    if (error instanceof Error) return res.status(500).json({ error: error.message })
  }
}