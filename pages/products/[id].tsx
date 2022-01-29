import { GetServerSideProps } from 'next'
import { getProduct } from '@providers/Product'
import { Product } from 'types/Product'
import Image from 'next/image'
import { addToCart } from '@providers/Cart'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string }
  if (!id) return { props: { product: null, error: "No id was provided" } }
  if (typeof id !== 'string') return { props: { product: null, error: "Id must be a string" } }
  const product = getProduct(id)
  return {
    props: {
      product
    }
  }
}

export default function ProductPage ({ product, error }: { product: Product, error: string }) {

  if (error) return <>{error}</>

  return (
    <>
      <h1 className='text-3xl font-black font-serif my-8'>{product.title}</h1>
      <Image src={product.thumbnail} alt={product.title} height={400} width={400} className='rounded-lg' />
      <h2>${product.price}</h2>
      <p className='my-4'>{product.description}</p>
      <button className='bg-accent-bg text-accent-text p-2 rounded-lg shadow-lg font-bold' onClick={() => addToCart(product.id, 1)}>Add to cart</button>
    </>
  )
}