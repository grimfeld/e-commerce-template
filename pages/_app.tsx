import '../styles/globals.css'
import type { AppProps } from 'next/app'
import NavBar from '@components/NavBar'

function MyApp ({ Component, pageProps }: AppProps) {
  return (
    <main className='flex flex-col items-start p-4'>
      <NavBar />
      <Component {...pageProps} />
    </main>
  )
}

export default MyApp
