import type { GetServerSideProps, NextPage } from 'next'
import { Product } from 'types/Product'
import Image from 'next/image'
import { useRouter } from 'next/router'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const productsRef = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/products')
  const products = await productsRef.json()
  return {
    props: {
      products
    }
  }
}


export default function Home ({ products }: { products: Product[] }) {
  const router = useRouter()

  if (products === undefined) return <>Loading...</>
  return (
    <>
      <h2 className='text-3xl font-black'>Products</h2>
      <div className="flex flex-wrap">
        {/* {products.map(product => (
          <div key={product.id} className='p-4 bg-white shadow-xl rounded-lg lg:mx-4 my-4'>
            <h3 onClick={() => router.push('/products/' + product.id)} className='cursor-pointer mb-4 font-bold text-xl font-serif'>{product.title}</h3>
            <div className='relative w-64 h-64'>
              <Image src={product.thumbnail} alt={product.title} layout='fill' objectFit='cover' objectPosition="center" />
            </div>
            <div className="flex">
              <p className='text-xs w-1/2 color-gray-500'>{product.description}</p>
              <p className='w-1/2 text-sm font-bold'>${product.price}</p>
            </div>
          </div>
        ))} */}
      </div>
    </>
  )
}
