import Cart from '@components/Cart'

export default function NavBar ({ }: {}): JSX.Element {
  return (
    <header className='flex justify-between items-center py-4 relative w-full'>
      <span>E-commerce</span>
      <Cart />
    </header>
  )
}