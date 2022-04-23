import { HttpError } from '@root/utils/HttpError'
import { Product } from "types/Product"

export class ProductProvider {
  private static instance: ProductProvider

  private products: Product[]

  private constructor () {
    if (process.env.NODE_ENV === 'test') {
      this.products = []
    } else if (process.env.NODE_ENV === 'development') {
      this.products = [
        {
          id: 1,
          title: 'Product 1',
          description: 'Description of product 1',
          thumbnail: 'https://images.unsplash.com/photo-1620780327051-f7ad06f5b1e0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80',
          medias: ['https://picsum.photos/200/300', 'https://picsum.photos/200/300'],
          feedbacks: ['Test feedback'],
          price: 49.99
        },
        {
          id: 2,
          title: 'Product 2',
          description: 'Description of product 2',
          thumbnail: 'https://picsum.photos/400',
          medias: ['https://picsum.photos/200/300', 'https://picsum.photos/200/300'],
          feedbacks: ['Test feedback'],
          price: 49.99
        },
      ]
    } else {
      this.products = [
        {
          id: 1,
          title: 'Product 1',
          description: 'Description of product 1',
          thumbnail: 'https://images.unsplash.com/photo-1620780327051-f7ad06f5b1e0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80',
          medias: ['https://picsum.photos/200/300', 'https://picsum.photos/200/300'],
          feedbacks: ['Test feedback'],
          price: 49.99
        },
        {
          id: 2,
          title: 'Product 2',
          description: 'Description of product 2',
          thumbnail: 'https://picsum.photos/400',
          medias: ['https://picsum.photos/200/300', 'https://picsum.photos/200/300'],
          feedbacks: ['Test feedback'],
          price: 49.99
        },
      ]
    }
  }

  public static getInstance (): ProductProvider {
    if (!ProductProvider.instance) {
      ProductProvider.instance = new ProductProvider()
    }
    return ProductProvider.instance
  }

  public async getProducts (): Promise<Product[]> {
    return this.products
  }

  public async getProduct (id: number): Promise<Product> {
    if (typeof id !== 'number') throw new HttpError(400, 'Id must be a string')
    const product = products.find(p => p.id === id)
    if (product === undefined) throw new HttpError(404, 'Product not found')
    return product
  }

  public async addProduct (product: Omit<Product, "id">, user: { id: number, admin: boolean }): Promise<Product> { // Add a product
    if (!user.admin) throw new HttpError(403, 'You are not authorized to do this')
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
      id: products.length + 1,
      title: product.title,
      description: product.description,
      thumbnail: product.thumbnail,
      medias: product.medias,
      feedbacks: product.feedbacks,
      price: product.price
    })

    return products[products.length - 1]
  }

}

let products: Product[] = []

if (process.env.NODE_ENV === 'test') {
  products = []
} else if (process.env.NODE_ENV === 'development') {
  products = [
    {
      id: 1,
      title: 'Product 1',
      description: 'Description of product 1',
      thumbnail: 'https://images.unsplash.com/photo-1620780327051-f7ad06f5b1e0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80',
      medias: ['https://picsum.photos/200/300', 'https://picsum.photos/200/300'],
      feedbacks: ['Test feedback'],
      price: 49.99
    },
    {
      id: 2,
      title: 'Product 2',
      description: 'Description of product 2',
      thumbnail: 'https://picsum.photos/400',
      medias: ['https://picsum.photos/200/300', 'https://picsum.photos/200/300'],
      feedbacks: ['Test feedback'],
      price: 49.99
    },
  ]
} else {
  products = [
    {
      id: 1,
      title: 'Product 1',
      description: 'Description of product 1',
      thumbnail: 'https://images.unsplash.com/photo-1620780327051-f7ad06f5b1e0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80',
      medias: ['https://picsum.photos/200/300', 'https://picsum.photos/200/300'],
      feedbacks: ['Test feedback'],
      price: 49.99
    },
    {
      id: 2,
      title: 'Product 2',
      description: 'Description of product 2',
      thumbnail: 'https://picsum.photos/400',
      medias: ['https://picsum.photos/200/300', 'https://picsum.photos/200/300'],
      feedbacks: ['Test feedback'],
      price: 49.99
    },
  ]
}


export const getProducts = (): Product[] => { // Return all products
  return products ?? "There is no products"
}

export const getProduct = (id: number): Product => { // Return a single product by id if it exists or throw errors
  if (typeof id !== 'number') throw new Error('Id must be a string')
  const product = products.find(p => p.id === id)
  if (product === undefined) throw new Error('Product not found')
  return product
}

export const addProduct = (product: Omit<Product, "id">, user: { id: number, admin: boolean }): Product => { // Add a product
  if (!user.admin) throw new HttpError(403, 'You are not authorized to do this')
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
    id: products.length + 1,
    title: product.title,
    description: product.description,
    thumbnail: product.thumbnail,
    medias: product.medias,
    feedbacks: product.feedbacks,
    price: product.price
  })

  return products[products.length - 1]
}


export const updateProduct = (product: Product, user: { id: number, admin: boolean }): Product => { // Update a product by id if it exists or throw errors
  if (!user.admin) throw new HttpError(403, 'You are not authorized to do this')
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

export const deleteProduct = (id: number, user: { id: number, admin: boolean }): "Product deleted" => { // Delete a product by id if it exists or throw errors
  if (!user.admin) throw new Error('You are not authorized to do this')
  const newProducts = products.filter(p => p.id !== id)
  if (newProducts.length === products.length) throw new Error('Product not found')
  products = newProducts
  return "Product deleted"
}
