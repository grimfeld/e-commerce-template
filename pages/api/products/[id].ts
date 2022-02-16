import { getProduct } from '@providers/Product'
import { NextApiRequest, NextApiResponse } from 'next'
import { Product } from 'types/Product'

export default function handler (
  req: NextApiRequest,
  res: NextApiResponse<Product>
) {

  const {
    query: { id },
    method
  } = req

  switch (method) {
    case 'GET':
      res.status(200).json(getProduct(id as string))
      break
    case 'PUT' || 'POST':
      break
    case 'DELETE':
      break
    default:
  }
}
