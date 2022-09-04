import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Meta from './components/Meta'
import NavBar from './components/NavBar'

function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <Meta />
    <NavBar />
    <Component {...pageProps} />
  </>
}

export default MyApp
