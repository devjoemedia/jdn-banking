'use client'
import Image from 'next/image'
import Analytics from '@/components/Analytics'
import Chart from 'react-apexcharts'
import { useState, useEffect } from 'react'
import { BsSendFill } from "react-icons/bs";

export default function Home() {
  const donutOptions = {
    chart: {},
    colors: ['#1B74EF', '#e55c31'],
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: {
            fontSize: '20px',
          },
          value: {
            fontSize: '16px',
          },
        },
      },
    },
    labels: ['Income', 'Expenses'],
  }

  const donutSeries = [68]

  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <div>
      <div className='p-5 md:p-8 space-y-5 flex-1 text-primary-text h-100 overflow-y-scroll'>
        
        <div className='grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-5 md:gap-y-0'>
          <div className='col-span-2 gap-x-6'>
            <div className='min-h-[400px] bg-primary-bg hover:cursor-pointer p-5 flex-1'>
              <p className='text-xl font-semibold'>Send Money</p>

              <div className="relative mt-6 space-y-5">
                <input type="text" placeholder="Full Name" aria-label="Full Name" className="block focus:outline-none w-full bg-secondary-bg rounded-md py-4 pl-6 pr-20" />
                
                <input type="email" placeholder="Email" aria-label="Email" className="block focus:outline-none w-full bg-secondary-bg rounded-md py-4 pl-6 pr-20" />
                
                <input type="number" placeholder="Amount" aria-label="Amount" className="block focus:outline-none w-full bg-secondary-bg rounded-md py-4 pl-6 pr-20" />
                
                <textarea cols={30} placeholder="Comment" aria-label="Comment" className="block focus:outline-none w-full bg-secondary-bg rounded-md py-4 pl-6 pr-20" />

                <button className="flex items-center justify-center mt-4 py-3 px-5 w-[180px] bg-primary rounded shadow-md text-white">Send <BsSendFill className="ml-3" /></button>
              </div>
            </div>
          </div>

          <div className=' hover:cursor-pointer '>
            <div className='shadow-md rounded  min-h-[400px] text-white bg-primary hover:cursor-pointer p-3 flex-1'>
              <p className=' text-2xl'>$600,000</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

