"use client";
import Analytics from "@/components/Analytics";
import { useState, useEffect } from "react";
import TransactionCard from "@/components/TransactionCard";

export default function Home() {
  return (
    <div>
      <div className='p-5 md:p-8 space-y-5 flex-1 text-primary-text h-100 overflow-y-scroll'>
        <div className='grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-5'>
          <div className='col-span-2 gap-x-6'>
            <div className='shadow-md rounded  min-h-[400px] bg-primary-bg hover:cursor-pointer p-3 flex-1'>
              <p className='text-xl font-semibold'>Portfolio Value</p>
              <p className=' text-xl'>$600,000</p>
              <Analytics />
            </div>
          </div>

          <div className=' hover:cursor-pointer '>
            <div className=' grid-cols-2 grid gap-5 min-h-[400px] hover:cursor-pointer flex-1'>
              <div className=' shadow-md rounded  min-h-[200px] bg-primary-bg hover:cursor-pointer p-3 flex-1'>
                <p className=' text-2xl'>$600,000</p>
              </div>
              <div className=' shadow-md rounded  min-h-[200px] bg-primary-bg hover:cursor-pointer p-3 flex-1'>
                <p className=' text-2xl'>$600,000</p>
              </div>
              <div className=' shadow-md rounded  min-h-[200px] bg-primary-bg hover:cursor-pointer p-3 flex-1'>
                <p className=' text-2xl'>$600,000</p>
              </div>
              <div className=' shadow-md rounded  min-h-[200px] bg-primary-bg hover:cursor-pointer p-3 flex-1'>
                <p className=' text-2xl'>$600,000</p>
              </div>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-5 md:gap-y-0'>
          <div className='col-span-2 gap-x-6'>
            <div className='shadow-md rounded  min-h-[400px] bg-primary-bg hover:cursor-pointer p-3 flex-1'>
              <p className='text-xl font-semibold px-5 mb-5'>History</p>

              <TransactionCard />
              <TransactionCard />
              <TransactionCard />
              <TransactionCard />
              <TransactionCard />

              <div className='flex justify-end mt-3'>
                <p className='text-[14px] underline px-5'>View all</p>
              </div>
            </div>
          </div>

          <div className=' hover:cursor-pointer '>
            <div className='shadow-md rounded text-white min-h-[400px] bg-primary hover:cursor-pointer p-3 flex-1'>
              <p className=' text-2xl'>$600,000</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
