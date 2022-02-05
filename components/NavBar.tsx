import { Button } from '@chakra-ui/react'
import Cart from '@components/Cart'
import { getCurrentUser, logOut } from '@providers/User'
import eventBus from '@root/utils/EventBus'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { User } from 'types/User'

export default function NavBar ({ }: {}): JSX.Element {

  const router = useRouter()

  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined)

  useEffect(() => {
    setCurrentUser(getCurrentUser())
    eventBus.on('auth-state-changed', () => setCurrentUser(getCurrentUser()))
  }, [])

  return (
    <header className='flex justify-between items-center py-4 relative w-full'>
      <Link href="/">E-commerce</Link>
      <div className="flex items-center">
        {currentUser && <span onClick={() => router.push('/account')}>Welcome {currentUser.username}</span>}
        {currentUser && <Button className='mx-2' onClick={logOut}><i className='bx bx-log-out cursor-pointer'></i></Button>}
        {!currentUser && <Button className='mx-2' onClick={() => router.push('/login')}><i className='bx bx-log-in cursor-pointer' ></i></Button>}
        <Cart />
      </div>
    </header>
  )
}