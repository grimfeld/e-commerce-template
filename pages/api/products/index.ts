// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { addProduct, getProducts } from '@providers/Product'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Product } from 'types/Product'

export default function handler (
  req: NextApiRequest,
  res: NextApiResponse<Product[] | Product | { error: string } | { message: string }>
) {
  try {
    const {
      body,
      method
    } = req
    const products = getProducts()
    console.log(typeof body)
    const data = JSON.parse(body)
    switch (method) {
      case 'GET':
        return res.status(200).json(products)
      case 'POST':
        const newProduct = addProduct(data.product as Product, data.user as { id: number, token: string })
        return res.status(201).json(newProduct)
      default:
        return res.status(405).json({ error: 'Method not allowed' })
    }
  } catch (error) {
    console.log(error)
    if (error instanceof Error) return res.status(500).json({ error: error.message })
    return res.status(500).json({ error: 'Internal server error' })
  }
}
