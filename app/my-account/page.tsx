import React from 'react'
import { BsSendFill } from "react-icons/bs";
import Image from "next/image";

const MyAccount = () => {
  return (
    <div>
      <div className='p-5 md:p-8 space-y-5 flex-1 text-primary-text h-100 overflow-y-scroll'>
        
        <div className='shadow-md p-4 bg-primary-bg'>
          <div className='grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-5 md:gap-y-0'>
            <div className='h-[400px] w-full felx items-center justify-center hover:cursor-pointer p-3 flex-1'>
              <div className='w-[150px] mx-auto h-[150px] rounded-full '>
                <Image
                  src='/profile.png'
                  width={150}
                  height={150}
                  className='rounded-full'
                  alt='profile'
                  />
              </div>
              <button className="flex items-center mx-auto justify-center mt-4 py-3 px-5 w-[180px] bg-primary rounded shadow-md text-white">Change Photo</button>
            </div>

            <div className='col-span-2 gap-x-6'>
              <div className='min-h-[400px] bg-primary-bg hover:cursor-pointer p-5 flex-1'>
                <p className='text-xl font-semibold'>User Settings</p>

                <div className="relative mt-6 space-y-5">
                  <input type="text" placeholder="Full Name" aria-label="Full Name" className="block focus:outline-none w-full bg-secondary-bg rounded-md py-4 pl-6 pr-20" />
                  
                  <input type="email" placeholder="Email" aria-label="Email" className="block focus:outline-none w-full bg-secondary-bg rounded-md py-4 pl-6 pr-20" />
                  
                  <input type="text" placeholder="Phone" aria-label="Phone" className="block focus:outline-none w-full bg-secondary-bg rounded-md py-4 pl-6 pr-20" />
                  
                  <textarea row={20} cols={30} placeholder="Bio" aria-label="Bio" className="block focus:outline-none w-full bg-secondary-bg rounded-md py-4 pl-6 pr-20" />

                  <button className="flex items-center justify-center mt-4 py-3 px-5 w-[180px] bg-primary rounded shadow-md text-white">Save</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyAccount