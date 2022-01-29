import { Product } from "types/Product"

let products: Product[] = [
  {
    id: '1',
    title: 'Product 1',
    description: 'Description of product 1',
    thumbnail: 'https://picsum.photos/400',
    medias: ['https://picsum.photos/200/300', 'https://picsum.photos/200/300'],
    feedbacks: ['Test feedback'],
    price: 49.99
  },
  {
    id: '2',
    title: 'Product 2',
    description: 'Description of product 2',
    thumbnail: 'https://picsum.photos/400',
    medias: ['https://picsum.photos/200/300', 'https://picsum.photos/200/300'],
    feedbacks: ['Test feedback'],
    price: 49.99
  },
]

const getProducts = (): Product[] => { // Return all products
  return products
}

const getProduct = (id: string): Product => { // Return a single product by id if it exists or throw errors
  if (typeof id !== 'string') throw new Error('Id must be a string')
  if (id === '') throw new Error('Id must not be empty')
  const product = products.find(p => p.id === id)
  if (product === undefined) throw new Error('Product not found')
  return product
}

export { getProducts, getProduct }