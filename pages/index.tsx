import type { NextPage } from 'next'
import { useContext } from 'react'
import { ProductsProvider, ProductsContext } from '../contexts/Products'

const Home: NextPage = () => {

  const { products, addProduct, getProduct, removeProduct } = useContext(ProductsContext)

  return (
    <ProductsProvider>

    </ProductsProvider>
  )
}

export default Home
