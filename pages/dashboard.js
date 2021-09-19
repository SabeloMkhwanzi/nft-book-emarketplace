/* eslint-disable react/jsx-no-undef */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from "web3modal"
import Pdf from '../components/pdf';

import { Document, Page,pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc =
`//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


import {
  nftmarketaddress, nftaddress
} from '../config'

import Market from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json'
import NFT from '../artifacts/contracts/NFT.sol/NFT.json'

export default function CreatorDashboard() {
  const [nfts, setNfts] = useState([])
  const [sold, setSold] = useState([])
  const [loadingState, setLoadingState] = useState('not-loaded')
  useEffect(() => {
    loadNFTs()
  }, [])
  async function loadNFTs() {
    const web3Modal = new Web3Modal({
      network: "mainnet",
      cacheProvider: true,
    })
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    const marketContract = new ethers.Contract(nftmarketaddress, Market.abi, signer)
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider)
    const data = await marketContract.fetchItemsCreated()

    const items = await Promise.all(data.map(async i => {
      const tokenUri = await tokenContract.tokenURI(i.tokenId)
      const meta = await axios.get(tokenUri)
      let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
      let item = {
        price,
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        sold: i.sold,
        image: meta.data.image,  
      } 
      return item
    }))

    const item = await Promise.all(data.map(async i => {
      const tokenUri = await tokenContract.tokenURI(i.tokenId)
      const meta = await axios.get(tokenUri)
      let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
      let ImageItem = {
        image: meta.data.image,     
      }
      return ImageItem
    }));
    
    /* create a filtered array of items that have been sold */
    const soldItems = items.filter(i => i.sold)
    setSold(soldItems)
    setNfts(items)
    setLoadingState('loaded') 

    console.log(item, "image");
    
  }
  if (loadingState === 'loaded' && !nfts.length) return (<h1 className="py-10 px-20 text-3xl min-h-screen">No assets created</h1>)
  return (
    
    <div>
      <div className="p-4">
        <h2 className="text-2xl py-2">Items Created</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {
            nfts.map((nft, i) => (
              <div key={i} className="bg-white border shadow rounded-xl overflow-hidden">

                <img src={nft.image} alt="" className="w-full" />
                

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
                 </div>
                 </div>
               </div>
            ))
          }
        </div>
      </div>
        <div className="px-4">
        {
          Boolean(sold.length) && (
            <div>
              <h2 className="text-2xl py-2">Items sold</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 py-5">
                {
                  sold.map((nft, i) => (
                    <div key={i} className="bg-white border shadow rounded-xl overflow-hidden px-14 py-14 ">
                    <img src={nft.image} alt="" className="w-full "/>
                    <div className="px-4 py-0 pt-36">
                    <div className="semi-bold text-gray-500 text-sm mb-2 uppercase">
                    <ul>
                    <li className="md:text-md text-black"><strong>
                    {nft.name}</strong>
                    </li>
                    <li className="lowercase"><strong>
                    {nft.description}</strong></li>
                    <li className="md:text-md text-black"><strong>
                    {nft.price} ETH</strong></li>
                  </ul>
                 </div>
                 </div>
               </div>
                  ))
                }
              </div>
            </div>
          )
        }
        </div>
    </div>
  )
}