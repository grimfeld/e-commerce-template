// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getProducts } from '@providers/Product'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Product } from 'types/Product'

export default function handler (
  req: NextApiRequest,
  res: NextApiResponse<Product[]>
) {
  const products = getProducts()

  res.status(200).json(products)
}
