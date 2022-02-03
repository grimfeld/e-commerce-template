import Cart from '@components/Cart'
import Link from 'next/link'

export default function NavBar ({ }: {}): JSX.Element {
  return (
    <header className='flex justify-between items-center py-4 relative w-full'>
      <Link href="/">E-commerce</Link>
      <Cart />
    </header>
  )
}