import { getProducts } from '@providers/Product'
import { getCurrentUser } from '@providers/User'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Product } from 'types/Product'
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from '@chakra-ui/react'


export const getServerSideProps: GetServerSideProps = async () => {
  const productsRef = await fetch(process.env.BASE_URL + '/api/products')
  const products = await productsRef.json()
  return {
    props: {
      products
    }
  }
}

export default function Admin ({ products }: { products: Product[] }) {

  const router = useRouter()

  useEffect(() => {
    const currentUser = getCurrentUser()
    console.log(currentUser)
    if (currentUser === undefined) router.push('/login')
    if (!currentUser?.admin) router.push('/error/not-authorized')
  }, [router])

  return (
    <div>
      {products.length > 0 ? (
        <Table>
          <TableCaption>The list of products</TableCaption>
          <Thead>
            <Tr>
              <Th>Title</Th>
              <Th>Price</Th>
              <Th>Description</Th>
            </Tr>
          </Thead>
          <Tbody>
            {products.map(product => (
              <Tr key={product.id}>
                <Td>{product.title}</Td>
                <Td>{product.price}</Td>
                <Td>{product.description}</Td>
              </Tr>
            ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>Title</Th>
              <Th>Price</Th>
              <Th>Description</Th>
            </Tr>
          </Tfoot>
        </Table>
      ) : (
        <p>There are no products yet</p>
      )}

    </div>
  )
}