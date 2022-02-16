import { getCart, removeFromCart, updateCart } from '@providers/Cart'
import { useState } from 'react'
import { Button, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'

export default function Cart (): JSX.Element {

  const [cart, setCart] = useState(getCart())

  const handleRemove = (id: string) => {
    const newCart = removeFromCart(id)
    setCart([...newCart])
  }

  const handleUpdate = (id: string, quantity: number) => {
    const newCart = updateCart(id, quantity)
    setCart([...newCart])
  }

  const [active, setActive] = useState(false)

  return (
    <>
      <Menu>
        <MenuButton as={Button}>
          <i className='bx bx-cart cursor-pointer' onClick={() => setActive(!active)}></i>
        </MenuButton>
        <MenuList>
          {cart.map(item => <MenuItem key={item.id}>{item.id}</MenuItem>)}
          {cart.length === 0 && <MenuItem>Your cart is empty</MenuItem>}
        </MenuList>
      </Menu>
    </>
  )
}