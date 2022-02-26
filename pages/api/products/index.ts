// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { addProduct, getProducts } from '@providers/Product'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Product } from 'types/Product'
import jwt from "jsonwebtoken"
import { HttpError } from '@root/utils/HttpError'

export default function handleProducts (req: NextApiRequest, res: NextApiResponse) {
  try {
    const {
      body,
      method,
      headers
    } = req
    const products = getProducts()

    const token = headers.authorization?.split(' ')[1]

    switch (method) {
      case 'GET':
        return res.status(200).json(products)
      case 'POST':
        if (process.env.JWT_SECRET === undefined) throw new HttpError(500, 'JWT_SECRET is not defined')
        if (token === undefined) throw new HttpError(401, 'Unauthenticated')
        const user = jwt.verify(token, process.env.JWT_SECRET)
        const newProduct = addProduct(body as Product, user as { id: number, admin: boolean })
        return res.status(201).json(newProduct)
      default:
        throw new HttpError(405, 'Method not allowed')
    }
  } catch (error) {
    if (error instanceof HttpError) return res.status(error.status).json({ error: error.message })
    if (error instanceof Error) return res.status(500).json({ error: error.message })
    return res.status(500).json({ error: 'Internal server error' })
  }
}
