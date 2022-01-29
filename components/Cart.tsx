import { getCart } from '@providers/Cart'
import { useState } from 'react'
import CartItem from '@components/Cart/CartItemRow'

export default function Cart (): JSX.Element {

  const cart = getCart()

  const [active, setActive] = useState(false)

  return (
    <>
      <i className='bx bx-cart cursor-pointer' onClick={() => setActive(!active)}></i>
      {active && <div className='absolute top-16 bg-white right-0 p-4 z-50 rounded-lg shadow-lg'>
        {cart.map(item => <CartItem key={item.id} {...item} />)}
        {cart.length === 0 && <p>Your cart is empty</p>}
      </div>}
    </>
  )
}