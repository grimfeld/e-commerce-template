import ProductProvider from './Product'
const provider = ProductProvider.getInstance()
let products = provider.getProducts()

beforeAll(() => {
  products.push({
    id: products.length + 1,
    title: 'test-product',
    description: 'test-description',
    price: 39.99,
    thumbnail: 'test-thumbnail',
    medias: ["test-media"],
    feedbacks: ["test-feedback"]
  })
})

describe("Getters test suite", () => {
  it("Returns the products list", () => {
    expect(provider.getProducts()).toEqual([{
      id: 1,
      title: "test-product",
      description: "test-description",
      price: 39.99,
      thumbnail: "test-thumbnail",
      medias: ["test-media"],
      feedbacks: ["test-feedback"]
    }])
  })

  it("Fails to return a non existent product", () => {
    expect(() => provider.getProduct(2)).toThrowError("Product not found")
  })

  it("Returns a specific product", () => {
    expect(provider.getProduct(1)).toEqual({
      id: 1,
      title: "test-product",
      description: "test-description",
      price: 39.99,
      thumbnail: "test-thumbnail",
      medias: ["test-media"],
      feedbacks: ["test-feedback"]
    })
  })
})

describe('Adding products suite', () => {
  it('Fails if user is not admin', () => {
    expect(() => provider.addProduct({
      title: "test-product",
      description: "test-description",
      price: 39.99,
      thumbnail: "test-thumbnail",
      medias: ["test-media"],
      feedbacks: ["test-feedback"]
    }, {
      id: 1,
      admin: false
    })).toThrowError('You are not authorized to do this')
  })
  it.each([
    { title: "", description: "test-description", price: 39.99, thumbnail: "test-thumbnail", medias: ["test-media"], feedbacks: ["test-feedback"] },
    { title: "test-product", description: "", price: 39.99, thumbnail: "test-thumbnail", medias: ["test-media"], feedbacks: ["test-feedback"] },
    { title: "test-product", description: "test-description", price: -13.99, thumbnail: "", medias: ["test-media"], feedbacks: ["test-feedback"] },
    { title: "test-product", description: "test-description", price: 39.99, thumbnail: "", medias: ["test-media"], feedbacks: ["test-feedback"] },
    { title: "test-product", description: "test-description", price: 39.99, thumbnail: "test-thumbnail", medias: undefined, feedbacks: ["test-feedback"] },
    { title: "test-product", description: "test-description", price: 39.99, thumbnail: "test-thumbnail", medias: ["test-media"], feedbacks: undefined }
  ])('Fails if data is wrong', (product) => {
    expect(() => provider.addProduct(product, {
      id: 1,
      admin: true
    })).toThrowError()
  })
  it('Adds a new product to the database and returns it', () => {
    expect(provider.addProduct({
      title: "test-product",
      description: "test-description",
      price: 39.99,
      thumbnail: "test-thumbnail",
      medias: ["test-media"],
      feedbacks: ["test-feedback"]
    }, {
      id: 1,
      admin: true
    })).toEqual({
      id: 2,
      title: "test-product",
      description: "test-description",
      price: 39.99,
      thumbnail: "test-thumbnail",
      medias: ["test-media"],
      feedbacks: ["test-feedback"]
    })
  })
})

describe("Updating products suite", () => {

})

describe("Deleting products suite", () => {
  it("Fails if user is not admin", () => {
    expect(() => provider.deleteProduct(1, {
      id: 1,
      admin: false
    })).toThrowError('You are not authorized to do this')
  })
  it('Fails if product is not found', () => {
    expect(() => provider.deleteProduct(9999, {
      id: 1,
      admin: true
    })).toThrowError('Product not found')
  })
  it('Deletes a product from the database', () => {
    expect(provider.deleteProduct(1, {
      id: 1,
      admin: true
    })).toEqual("Product deleted")
  })
})

afterAll(() => {
  products = []
})
