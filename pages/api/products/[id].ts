import { getProduct, getProducts, deleteProduct, addProduct, updateProduct } from '@providers/Product'
import { NextApiRequest, NextApiResponse } from 'next'
import { Product } from 'types/Product'

export default function handler (
  req: NextApiRequest,
  res: NextApiResponse<Product | { error: string } | { message: string }>
) {


  try {

    const {
      query: { id },
      body,
      method
    } = req

    switch (method) {
      case 'GET':
        res.status(200).json(getProduct(id as string))
        break
      case 'POST':
        res.status(405).json({ error: 'Method not allowed' })
        break
      case 'PUT':
        updateProduct(body.product as Product, body.user as { id: number, token: string })
        res.status(200).json(getProduct(id as string))
        break
      case 'DELETE':
        deleteProduct(id as string, body.user as { id: number, token: string })
        res.status(204).json({ message: 'Product deleted' })
        break
      default:
        res.status(200).json(getProduct(id as string))
    }
  } catch (error) {
    if (error instanceof Error) res.status(500).json({ error: error.message })
    res.status(500).json({ error: 'Internal server error' })
  }

}
