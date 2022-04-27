import { HttpError } from '@root/utils/HttpError'
import { Product } from "types/Product"
import Database from './Database'

export default class ProductProvider {

  private db: Database

  private constructor () {
    this.db = Database.getInstance()
    // this.db.createTable("products")
    // if (process.env.NODE_ENV === 'test') {
    //   this.db.insertIntoTable("products", [])
    // } else if (process.env.NODE_ENV === 'development') {
    //   this.db.insertIntoTable("products", [
    //     {
    //       id: 1,
    //       title: 'Product 1',
    //       description: 'Description of product 1',
    //       thumbnail: 'https://images.unsplash.com/photo-1620780327051-f7ad06f5b1e0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80',
    //       medias: ['https://picsum.photos/200/300', 'https://picsum.photos/200/300'],
    //       feedbacks: ['Test feedback'],
    //       price: 49.99
    //     },
    //     {
    //       id: 2,
    //       title: 'Product 2',
    //       description: 'Description of product 2',
    //       thumbnail: 'https://picsum.photos/400',
    //       medias: ['https://picsum.photos/200/300', 'https://picsum.photos/200/300'],
    //       feedbacks: ['Test feedback'],
    //       price: 49.99
    //     },
    //   ])
    // } else {
    //   this.db.insertIntoTable("products", [
    //     {
    //       id: 1,
    //       title: 'Product 1',
    //       description: 'Description of product 1',
    //       thumbnail: 'https://images.unsplash.com/photo-1620780327051-f7ad06f5b1e0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80',
    //       medias: ['https://picsum.photos/200/300', 'https://picsum.photos/200/300'],
    //       feedbacks: ['Test feedback'],
    //       price: 49.99
    //     },
    //     {
    //       id: 2,
    //       title: 'Product 2',
    //       description: 'Description of product 2',
    //       thumbnail: 'https://picsum.photos/400',
    //       medias: ['https://picsum.photos/200/300', 'https://picsum.photos/200/300'],
    //       feedbacks: ['Test feedback'],
    //       price: 49.99
    //     },
    //   ])
    // }
  }

  public validateProduct (product: Omit<Product, 'id'>): boolean {
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
    return true
  }

  public getProducts (): Product[] {
    return this.db.getTable("products")
  }

  public getProduct (id: number): Product {
    if (typeof id !== 'number') throw new HttpError(400, 'Id must be a string')
    const product = this.products.find(p => p.id === id)
    if (product === undefined) throw new HttpError(404, 'Product not found')
    return product
  }

  public query (id: number, fields: keyof Product): any { // A function that returns specific fields from a product
    if (typeof id !== 'number') throw new Error('Id must be a string')
    if (fields.length === 0) throw new Error('Fields can not be empty')
    const product = this.products.find(p => p.id === id)
    if (product === undefined) throw new Error('Product not found')
    const result: any = {}
    for (const field of fields) {
      // result[field] = product[field]
    }
  }

  public searchProduct (query: string): Product[] {
    if (typeof query !== 'string') throw new HttpError(400, 'Query must be a string')
    if (query === '') throw new HttpError(400, 'Query must not be empty')
    return this.products.filter(p => {
      const content = p.title + p.description
      if (content.toLowerCase().includes(query.toLowerCase())) return p
    })
  }

  public addProduct (product: Omit<Product, "id">): Product { // Add a product
    if (!this.validateProduct(product)) throw new Error('Product is not valid')

    this.products.push({
      id: this.products.length + 1,
      title: product.title,
      description: product.description,
      thumbnail: product.thumbnail,
      medias: product.medias,
      feedbacks: product.feedbacks,
      price: product.price
    })

    return this.products[this.products.length - 1]
  }

  public updateProduct (product: Product): Product { // Update a product by id if it exists or throw error
    if (typeof product.id !== 'string') throw new Error('Product id must be a string')
    if (product.id === '') throw new Error('Product id must not be empty')
    if (!this.validateProduct(product)) throw new Error('Product is not valid')
    const index = this.products.findIndex(p => p.id === product.id)
    if (index === -1) throw new Error('Product not found')
    this.products[index] = product
    return product
  }

  public deleteProduct (id: number): "Product deleted" { // Delete a product by id if it exists or throw errors
    const newProducts = this.products.filter(p => p.id !== id)
    if (newProducts.length === this.products.length) throw new Error('Product not found')
    this.products = newProducts
    return "Product deleted"
  }

}
