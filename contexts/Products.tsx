import React, { createContext, useState } from 'react'

const ProductsContext = createContext({})

interface Product {
  id: string
  title: string
  description: string
  thumbnail: string
  medias: string[]
  feedbacks: string[]
  price: number
}

const ProductsProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      title: 'Product 1',
      description: 'Description of product 1',
      thumbnail: 'https://picsum.photos/200/300',
      medias: ['https://picsum.photos/200/300', 'https://picsum.photos/200/300'],
      feedbacks: ['Test feedback'],
      price: 49.99
    },
    {
      id: '2',
      title: 'Product 2',
      description: 'Description of product 2',
      thumbnail: 'https://picsum.photos/200/300',
      medias: ['https://picsum.photos/200/300', 'https://picsum.photos/200/300'],
      feedbacks: ['Test feedback'],
      price: 49.99
    },
  ])

  const addProduct = (product: Product) => {
    setProducts([...products, product])
  }

  const removeProduct = (productId: string) => {
    setProducts(products.filter(product => product.id !== productId))
  }

  const getProduct = (productId: string) => {
    return products.find(product => product.id === productId)
  }

  return <ProductsContext.Provider value={{ products, addProduct, getProduct, removeProduct }}> {children} </ProductsContext.Provider>
}

export { ProductsProvider, ProductsContext }