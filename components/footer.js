/* eslint-disable react/jsx-no-undef */
import React from 'react'
import { AiFillGithub, AiOutlineTwitter, AiFillLinkedin } from 'react-icons/ai';

export default function footer() {
    return (
        <div>
            <>
              <footer className="foot-1 bg-gray-600 sm:py-1 ">
                  <div className="px-1 mt-4 sm:w-1/3px-4 mt-4 sm:w-1/3 xl:w-1/6 sm:mx-auto xl:mt-0 xl:ml-auto">
                    <h6 className="text-ms font-bold mb-6 sm:text-center pt-5">Made with ❤️ by Sabelo</h6>
                     <div className="inline-block flex pb-3 justify-center">
                         <a href="#"><AiFillGithub size="2rem" className="px-1"  /></a>
                         <a href="#"><AiOutlineTwitter size="2rem" className="px-1" /></a>                         
                     </div>                                   
                  </div>                
               </footer>             
         </>
      </div>
    )
}


