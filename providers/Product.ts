import { HttpError } from '@root/utils/HttpError'
import { Product } from "types/Product"
import Database from './Database'

export default class ProductProvider {

  private db: Database
  private table: string = "products"

  constructor () {
    this.db = Database.getInstance()
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
    return this.db.getTable<Product>(this.table)
  }

  public getProduct (id: number): Product {
    if (typeof id !== 'number') throw new Error('Id must be a number')
    const product = this.db.getFromTableByField<Product>(this.table, "id", id)
    if (product === undefined) throw new Error('Product not found')
    return product
  }

  // public query (id: number, fields: keyof Product): any { // A function that returns specific fields from a product
  //   if (typeof id !== 'number') throw new Error('Id must be a string')
  //   if (fields.length === 0) throw new Error('Fields can not be empty')
  //   const product = this.products.find(p => p.id === id)
  //   if (product === undefined) throw new Error('Product not found')
  //   const result: any = {}
  //   for (const field of fields) {
  //     // result[field] = product[field]
  //   }
  // }

  // public searchProduct (query: string): Product[] {
  //   if (typeof query !== 'string') throw new HttpError(400, 'Query must be a string')
  //   if (query === '') throw new HttpError(400, 'Query must not be empty')
  //   return this.products.filter(p => {
  //     const content = p.title + p.description
  //     if (content.toLowerCase().includes(query.toLowerCase())) return p
  //   })
  // }

  public addProduct (product: Omit<Product, "id">): Product { // Add a product
    if (!this.validateProduct(product)) throw new Error('Product is not valid')

    this.db.insertIntoTable<Product>(this.table, [{
      id: this.db.getTable<Product>(this.table).length + 1,
      title: product.title,
      description: product.description,
      thumbnail: product.thumbnail,
      medias: product.medias,
      feedbacks: product.feedbacks,
      price: product.price
    }])

    return this.db.getFromTableByField<Product>(this.table, "id", this.db.getTable(this.table).length)
  }

  public updateProduct (updatedProduct: Product): Product { // Update a product by id if it exists or throw error
    const oldProduct = this.db.getFromTableByField<Product>(this.table, "id", updatedProduct.id)
    if (oldProduct === undefined) throw new Error('Product not found')
    if (!this.validateProduct(updatedProduct)) throw new Error('Product is not valid')
    this.db.updateIntoTable(this.table, oldProduct, updatedProduct)
    return this.db.getFromTableByField<Product>(this.table, "id", updatedProduct.id)
  }

  public deleteProduct (id: number): "Product deleted" { // Delete a product by id if it exists or throw errors
    if (typeof id !== 'number') throw new Error('Id must be a number')
    const product = this.db.getFromTableByField<Product>(this.table, "id", id)
    if (product === undefined) throw new Error('Product not found')
    this.db.deleteFromTable(this.table, product)
    return "Product deleted"
  }

}
