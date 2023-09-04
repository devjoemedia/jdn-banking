import Link from 'next/link'
import React from 'react'

const Cards = () => {
  return (
    <div>
      <div className='flex bg-light-bg h-[100vh] overflow-hidden max-w-[1440px] mx-auto '>
        <div className='  bg-dark-bg border-[#eeedf0] border-r border-l flex-[0.35] space-y-5 '>
          <ul className=' text-primary'>
            <li className='group space-x-3 px-3 py-5 border-b flex items-center justify-center'>
              <button className="rounded shadow bg-secondary py-1 px-5 min-w-[200px] text-capitalized text-center text-white">Add New Card</button>
            </li>

            <li className='group  space-x-3 hover:bg-dark-bg  px-3 py-5 hover:cursor-pointer border-b'>
              <p className='ml-3 '>Basic Cooperate</p>
              <p className='text-slate-400 text-xs m-0 p-0'>Active</p>
              <div className="flex justify-between items mt-2">
                <p>Card Balance</p>
                <p className="font-bold">$34,347.90</p>
              </div>
            </li>
            <li className='group  space-x-3 hover:bg-dark-bg  px-3 py-5 hover:cursor-pointer border-b'>
              <p className='ml-3 '>Investment Card</p>
              <p className='text-slate-400 text-xs m-0 p-0'>Active</p>
              <div className="flex justify-between items mt-2">
                <p>Card Balance</p>
                <p className="font-bold">$34,347.90</p>
              </div>
            </li>
            <li className='group  space-x-3 hover:bg-dark-bg  px-3 py-5 hover:cursor-pointer border-b'>
              <p className='ml-3 '>Savings Card</p>
              <p className='text-slate-400 text-xs m-0 p-0'>Active</p>
              <div className="flex justify-between items mt-2">
                <p>Card Balance</p>
                <p className="font-bold">$34,347.90</p>
              </div>
            </li>
          </ul>
        </div>

        <div className='flex-1'>
          <div className='p-5 h-100 space-y-4'>
            <div className="">
              <h1 className="font-bold text-2xl">Investment Account</h1>
            </div>

            <div className="bg-light-bg p-3 flex justify-around items-center">
              <div className="border-r border-green px-3">
                <h1 className='text-slate-400 text-xs m-0 p-0'>Card Number</h1>
                <h1 className="text-md">2333 5454 6565 7666</h1>
              </div>
              <div className="border-r border-green px-3">
                <h1 className='text-slate-400 text-xs m-0 p-0'>Expiry Date</h1>
                <h1 className="text-md">12/26</h1>
              </div>
              <div className="border-r border-green px-3">
                <h1 className='text-slate-400 text-xs m-0 p-0'>CVC</h1>
                <h1 className="text-md">*****</h1>
              </div>
              <div className="border-r border-green px-3">
                <h1 className='text-slate-400 text-xs m-0 p-0'>Type</h1>
                <h1 className="text-md">Virtual</h1>
              </div>
              <div className="px-3">
                <h1 className='text-slate-400 text-xs m-0 p-0'>Status</h1>
                <h1 className="text-md">Active</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cards