import '../styles/globals.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  console.log(pageProps);
  return <Component {...pageProps} />
  // return <Component />
}
export default MyApp
