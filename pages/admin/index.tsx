import { getCurrentUser } from '@providers/User'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Admin () {

  const router = useRouter()

  useEffect(() => {
    const currentUser = getCurrentUser()
    console.log(currentUser)
    if (currentUser === undefined) router.push('/login')
    if (!currentUser?.admin) router.push('/error/not-authorized')
  }, [router])

  return (
    <div>
      Admin
    </div>
  )
}