import { getProduct } from '@providers/Product'
import { CartItem } from 'types/Cart'
import Image from 'next/image'
import { getCartItem, removeFromCart, updateCart } from '@providers/Cart'
import { useState } from 'react'

export default function CartItemRow ({ id, product_id, quantity }: CartItem): JSX.Element {

  const product = getProduct(product_id)

  const [cartItem, setCartItem] = useState({ id, product_id, quantity })

  const reloadCartItem = () => {
    const item = getCartItem(id)
    setCartItem(item)
  }

  const handleUpdate = (quantity: number) => {
    try {
      updateCart(product.id, quantity)
    } catch (error) {
      console.log(error)
    } finally {
      reloadCartItem()
    }
  }

  return (
    <div className='flex justify-between items-start'>
      <div className='h-16 w-16 relative mr-4'>
        <Image src={product.thumbnail} alt={product.title} layout='fill' objectFit='cover' className='rounded-lg' />
      </div>
      <div className='w-48'>
        <p>{product.title}</p>
        <p className='text-xs text-gray-400'>{product.price}$</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <i className='bx bx-minus cursor-pointer bg-gray-100 p-1 rounded-full' onClick={() => handleUpdate(cartItem.quantity - 1)} />
            <span className='mx-4'>{cartItem.quantity}</span>
            <i className='bx bx-plus cursor-pointer bg-gray-100 p-1 rounded-full' onClick={() => handleUpdate(cartItem.quantity + 1)} />
          </div>
          <i className='bx bx-trash cursor-pointer bg-gray-100 p-1 rounded-full' onClick={() => removeFromCart(product.id)} />
        </div>
      </div>
    </div>
  )
}