import '../styles/globals.css'
import Link from 'next/link'

function MyApp({ Component, pageProps }) {
  return(
     <div>
        <nav className="border-b p6">
           <p className="text-4xl font-bold">Book NFT Marketplace</p>
             <div className="flex mt-4">
               <Link href="/"><a className="mr-4 text-purple-500">Home</a></Link>
               <Link href="/create-items"><a className="mr-4 text-purple-500">Sell Digital Assets</a></Link>
               <Link href="/my-assets"><a className="mr-4 text-purple-500">My Digital Assets</a></Link>
               <Link href="/creator-dashboard"><a className="mr-4 text-purple-500">Creator Dashboard</a></Link>
             </div>
         </nav>
       <Component {...pageProps} />
     </div>

  )
}

export default MyApp
