import { HttpError } from '@root/utils/HttpError'
import jwt from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from 'next'
import UserProvider from '@providers/User'
import cookie from 'cookie'

const userProvider = new UserProvider()

export default function handleRegistration (req: NextApiRequest, res: NextApiResponse<{ token: string } | { error: string } | any>) {
  try {
    const { body, method } = req

    // Check for right method
    if (method !== 'POST') throw new HttpError(405, 'Method not allowed')

    // Check for required fields
    if (!body) throw new HttpError(400, 'No body')

    let { username, email, password }: { username: string, email: string, password: string } = body

    if (typeof body === 'string') {
      const { u, e, p }: { u: string, e: string, p: string } = JSON.parse(body)
      username = u
      email = e
      password = p
    }

    if (!username) throw new HttpError(400, 'Username is required')
    if (!email) throw new HttpError(400, 'Email is required')
    if (!password) throw new HttpError(400, 'Password is required')

    const user = userProvider.register(username, email, password)

    if (process.env.JWT_SECRET === undefined) return res.status(500).json({ error: 'JWT_SECRET is not defined' })
    const token = jwt.sign(
      { id: user.id, admin: user.admin },
      process.env.JWT_SECRET,
      {
        issuer: 'https://e-commerce-app.grimfeld.tech',
        audience: 'https://e-commerce-app.grimfeld.tech',
        expiresIn: '1h'
      }
    )

    return res
      .setHeader('Set-Cookie', [
        cookie.serialize('Auth-Token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== 'development',
          sameSite: 'strict',
          maxAge: 86400
        })
      ])
      .status(200)
      .json({ token, user })
  } catch (error) {
    if (error instanceof HttpError) return res.status(error.status).json({ error: error.message })
    if (error instanceof Error) return res.status(500).json({ error: error.message })
  }
}