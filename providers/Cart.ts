import { CartItem } from 'types/Cart'

let Cart: CartItem[] = []

const getCart = (): CartItem[] => { // Return all cart items
  return Cart
}

const getCartItem = (product_id: string): CartItem => { // Return a single cart item by id if it exists or throw errors
  if (typeof product_id !== 'string') throw new Error('Id must be a string')
  if (product_id === '') throw new Error('Id must not be empty')
  const cartItem = Cart.find(p => p.product_id === product_id)
  if (cartItem === undefined) throw new Error('Cart item not found')
  return cartItem
}

const addToCart = (product_id: string, quantity: number): CartItem[] => { // Add a product to cart
  if (typeof product_id !== 'string') throw new Error('Product id must be a string')
  if (product_id === '') throw new Error('Product id must not be empty')
  if (typeof quantity !== 'number') throw new Error('Quantity must be a number')
  if (quantity === 0) throw new Error('Quantity must be greater than 0')
  const cartItem = Cart.find(c => c.product_id === product_id)
  if (cartItem === undefined) {
    Cart.push({
      id: `${Cart.length + 1}`,
      product_id,
      quantity
    })
  } else {
    cartItem.quantity += quantity
  }
  return Cart
}

const removeFromCart = (product_id: string): CartItem[] => { // Remove a product from cart
  if (typeof product_id !== 'string') throw new Error('Product id must be a string')
  if (product_id === '') throw new Error('Product id must not be empty')
  const cartItem = Cart.find(c => c.product_id === product_id)
  if (cartItem === undefined) throw new Error('Product not found')
  Cart = Cart.filter(c => c.product_id !== product_id)
  console.log(Cart)
  return Cart
}

const updateCart = (product_id: string, quantity: number): CartItem[] => { // Update a product quantity in cart
  if (typeof product_id !== 'string') throw new Error('Product id must be a string')
  if (product_id === '') throw new Error('Product id must not be empty')
  if (typeof quantity !== 'number') throw new Error('Quantity must be a number')
  if (quantity === 0) throw new Error('Quantity must be greater than 0')
  const cartItem = Cart.find(c => c.product_id === product_id)
  if (cartItem === undefined) throw new Error('Product not found')
  cartItem.quantity = quantity
  console.log(Cart)
  return Cart
}


export { getCart, getCartItem, addToCart, removeFromCart, updateCart }