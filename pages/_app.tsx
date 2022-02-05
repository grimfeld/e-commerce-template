import '../styles/globals.css'
import type { AppProps } from 'next/app'
import NavBar from '@components/NavBar'
import { ChakraProvider } from '@chakra-ui/react'

function MyApp ({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <main className='flex flex-col items-start p-4'>
        <NavBar />
        <Component {...pageProps} />
      </main>
    </ChakraProvider>
  )
}

export default MyApp
