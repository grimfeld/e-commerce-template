import { Product } from "types/Product"
import { getAuthUser } from './User'

let products: Product[] = [
  {
    id: '1',
    title: 'Product 1',
    description: 'Description of product 1',
    thumbnail: 'https://images.unsplash.com/photo-1620780327051-f7ad06f5b1e0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80',
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

export const getProducts = (): Product[] => { // Return all products
  return products
}

export const getProduct = (id: string): Product => { // Return a single product by id if it exists or throw errors
  if (typeof id !== 'string') throw new Error('Id must be a string')
  if (id === '') throw new Error('Id must not be empty')
  const product = products.find(p => p.id === id)
  if (product === undefined) throw new Error('Product not found')
  return product
}

export const addProduct = (product: Product, user: { id: number, token: string }): Product => { // Add a product to the products array and checks if the product is valid
  // if (typeof user?.token === 'undefined' || typeof user?.id === 'undefined') throw new Error('User must be logged in')
  console.log(user)
  const authUser = getAuthUser(user.id, user.token)
  console.log(authUser)
  if (user.token !== "admin" && (authUser === undefined || !authUser.admin)) throw new Error('You are not authorized to do this')
  if (typeof product !== 'object') throw new Error('Product must be an object')
  if (typeof product.title !== 'string') throw new Error('Product title must be a string')
  if (product.title === '') throw new Error('Product title must not be empty')
  if (typeof product.description !== 'string') throw new Error('Product description must be a string')
  if (product.description === '') throw new Error('Product description must not be empty')
  if (typeof product.thumbnail !== 'string') throw new Error('Product thumbnail must be a string')
  if (product.thumbnail === '') throw new Error('Product thumbnail must not be empty')
  if (!Array.isArray(product.medias)) throw new Error('Product medias must be an array')
  if (!Array.isArray(product.feedbacks)) throw new Error('Product feedbacks must be an array')
  if (typeof product.price !== 'number') throw new Error('Product price must be a number')
  if (product.price < 0) throw new Error('Product price must not be negative')

  products.push({
    id: products.length + 1 + '',
    title: product.title,
    description: product.description,
    thumbnail: product.thumbnail,
    medias: product.medias,
    feedbacks: product.feedbacks,
    price: product.price
  })

  return products[products.length - 1]
}


export const updateProduct = (product: Product, user: { id: number, token: string }): Product => { // Update a product by id if it exists or throw errors
  const authUser = getAuthUser(user.id, user.token)
  if (user.token !== "admin" && (authUser === undefined || !authUser.admin)) throw new Error('You are not authorized to do this')
  if (typeof product !== 'object') throw new Error('Product must be an object')
  if (typeof product.id !== 'string') throw new Error('Product id must be a string')
  if (product.id === '') throw new Error('Product id must not be empty')
  if (typeof product.title !== 'string') throw new Error('Product title must be a string')
  if (product.title === '') throw new Error('Product title must not be empty')
  if (typeof product.description !== 'string') throw new Error('Product description must be a string')
  if (product.description === '') throw new Error('Product description must not be empty')
  if (typeof product.thumbnail !== 'string') throw new Error('Product thumbnail must be a string')
  if (product.thumbnail === '') throw new Error('Product thumbnail must not be empty')
  if (!Array.isArray(product.medias)) throw new Error('Product medias must be an array')
  if (!Array.isArray(product.feedbacks)) throw new Error('Product feedbacks must be an array')
  if (typeof product.price !== 'number') throw new Error('Product price must be a number')
  if (product.price < 0) throw new Error('Product price must not be negative')
  const index = products.findIndex(p => p.id === product.id)
  if (index === -1) throw new Error('Product not found')
  products[index] = product
  return product
}

export const deleteProduct = (id: string, user: { id: number, token: string }): Product[] => { // Delete a product by id if it exists or throw errors
  const authUser = getAuthUser(user.id, user.token)
  if (user.token !== "admin" && (authUser === undefined || !authUser.admin)) throw new Error('You are not authorized to do this')
  const newProducts = products.filter(p => p.id !== id)
  if (newProducts.length === products.length) throw new Error('Product not found')
  products = newProducts
  return products
}
