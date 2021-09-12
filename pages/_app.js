import '../styles/globals.css';
import Link from 'next/link';
import Navbar from '../components/navbar';
import Footer from '../components/footer';



export function MyApp({ Component, pageProps })  {
  return(
   <div>   
    <Navbar /> 
    <Component {...pageProps} />
    <Footer />
  </div>
  )
}

export default MyApp
