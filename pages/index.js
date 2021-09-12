/* eslint-disable react/jsx-no-undef */
/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal, { connectors } from "web3modal"
import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { UserRemoveIcon, ShoppingBagIcon, BookOpenIcon, AnnotationIcon, GlobeAltIcon, LightningBoltIcon, ScaleIcon, MenuIcon, XIcon } from '@heroicons/react/outline'




import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc =
`//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


import { nftaddress, nftmarketaddress } from '../config'

import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import Market from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json'





export default function Home() {
  const [nfts, setNfts] = useState([])
  const [loadingState, setLoadingState] = useState('not-loaded')
  useEffect(() => {
    loadNFTs()
  }, [])
  async function loadNFTs() {
    /* create a generic provider and query for unsold market items */
    const provider = new ethers.providers.JsonRpcProvider("https://rinkeby.infura.io/v3/3ef17ef5bf7340ab9d97f938b3c4019c")
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider)
    const marketContract = new ethers.Contract(nftmarketaddress, Market.abi, provider)
    const data = await marketContract.fetchMarketItems()

    /*
    *  map over items returned from smart contract and format 
    *  them as well as fetch their token metadata
    */
    const items = await Promise.all(data.map(async i => {
      const tokenUri = await tokenContract.tokenURI(i.tokenId)
      const meta = await axios.get(tokenUri)
      let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
      let item = {
        price,
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        image: meta.data.image,
        name: meta.data.name,
        description: meta.data.description,
      }
      return item
    }))
    setNfts(items)
    setLoadingState('loaded') 
  }


  async function buyNft(nft) {
    /* needs the user to sign the transaction, so will use Web3Provider and sign it */
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(nftmarketaddress, Market.abi, signer)

    /* user will be prompted to pay the asking process to complete the transaction */
    const price = ethers.utils.parseUnits(nft.price.toString(), 'ether')   
    const transaction = await contract.createMarketSale(nftaddress, nft.tokenId, {
      value: price
    })
    await transaction.wait()
    loadNFTs()
  }
 

   const [numPages, setNumPages] = useState(null);
   const [pageNumber, setPageNumber] = useState(1);


  function onDocumentLoadSuccess({ numPages }) {
 	setNumPages(numPages);
 	setPageNumber(1); }
  
const features = [
  {
    name: 'How do I create an NFT Book?',
    description:
      'Choose your file to upload and Click [Create Nft Assets]. We currently support PDF, .',
    icon: BookOpenIcon,
  },
  {
    name: 'How do I sell an NFT?',
    description:
      'After uploading your book[PDF format] will be list immediately on the Marketplace as either an fixed price sale, according to your preference.',
    icon: ShoppingBagIcon,
  },
  {
    name: 'How do I buy an NFT?',
    description:
      'For NFTs with a fixed price, click the [Buy] button on the product page and complete the transaction. Once the transaction is successful, we will transfer the NFT to your wallet and the seller will receive the funds. NFT pdf book will appear on your asset dashboard',
    icon: UserRemoveIcon,
  },
 
]
 

console.log('image', nfts )

  if (loadingState === 'loaded' && !nfts.length) return (<h1 className="px-20 py-10 text-3xl">No items in marketplace</h1>)
  return (
      
            <>
            <div>
              <div>
                <main className="mt-10 mx-auto max-w-5xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-13 xl:mt-28 ">
                  <div className="sm:text-center lg:text-left">
                    <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-7xl">
                      <span className="block xl:inline">SCRIPTO </span>{' '}
                      <span className="block text-indigo-600 xl:inline">NFT BOOK Marketplace</span>
                    </h1>
                    <p className="mt-3 text-base pt-7 text-gray-800 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-8 md:text-xl lg:mx-0">
                    NFT revolution - Has presents a profitable business opportunity for anyone who intends to start their own NFT marketplace, Here at SCRIPTO 
                    we offer Authors, writers & artist a platform to exchange there incredible effort with NFT.
                    </p>
                    <div className="mb-36  sm:mt-10 pt-14 sm:flex sm:justify-center lg:justify-centre">
                      <div className="rounded-md shadow">
                        <a
                          href="/"
                          className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                        >
                          EXPLORE
                        </a>
                      </div>
                      <div className="mt-3 sm:mt-0 sm:ml-3">
                        <a
                          href="/create"
                          className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
                        >
                          CREATE
                        </a>
                      </div>
                    </div>
                  </div>
                </main>
              </div>
            </div>

                  
          <div className="flex justify-center bg-gray-400">   
            <div className="py-10" style={{ maxWidth: '1600px' }}> 
              <div className="lg:text-center">
                <p className=" text-center mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                  SCRIPTO NFT 
                </p>
              </div>
              <div className="lg:text-center">
                <p className="text-center mt-4 pb-5 max-w-2xl text-xl text-gray-500 lg:mx-auto">
               SCRIPTO NFT Marketplace platform to create, trade and earn.
                </p>
              </div>
            <div>
          </div>


       
           
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 px-5">
          {
            nfts.map((nft, i) => (
              <div key={i} className="bg-white border shadow rounded-xl overflow-hidden">
             

              <Document 

            src={'image', nfts}
    
              onLoadSuccess={onDocumentLoadSuccess}
              >
              <Page pageNumber={pageNumber} /> 
            </Document>

          
                
                <div className="px-4 py-1">
                 <div className="semi-bold text-gray-500 text-sm mb-0 uppercase">
                  <ul>
                    <li className="md:text-md text-black"><strong>
                      {nft.name}</strong>
                      </li>
                    <li className="lowercase"><strong>
                      {nft.description}</strong></li>
                    <li className="md:text-md text-black"><strong>
                      {nft.price} ETH</strong></li>
                  </ul>
                  <div className="justify-center px-20 ">
                   <button className="w-60 h-10 justify-center bg-pink-500 text-white font-bold rounded" onClick={() => buyNft(nft)}>Buy</button>
                  </div>
                 </div>
                 </div>
               </div>
             ))
           }
         </div>
       </div>
     </div>

  <div className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            A BETTER WAY TO EARN IN CRYPTO
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
          Invite authors writers, artists, creators, and crypto on SCRIPTO platform to create, trade and earn.
          </p>
        </div>

        <div className="mt-10 pb-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
    </>   
  )
}
