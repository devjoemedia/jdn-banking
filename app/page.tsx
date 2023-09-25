"use client";
import Analytics from "@/components/Analytics";
import DonutChart from "@/components/DonutChart";
import TransactionCard from "@/components/TransactionCard";
import HighestTransactions from "@/components/HighestTransactions";
import useCustonFetch from "app/hooks/useCustonFetch";
import Link from "next/link";

export default function Home() {
  const { data } = useCustonFetch({
    url: "/transactions",
    queryKey: ["allTransactions"],
  });

  return (
    <div>
      <div className='p-5 md:p-8 space-y-5 flex-1 text-primary-text h-100 overflow-y-scroll'>
        <div className='space-y-2 md:space-y-0 md:grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-5'>
          <div className='md:col-span-3 lg:col-span-2 gap-x-6'>
            <div className='shadow-md rounded  min-h-[400px] bg-primary-bg hover:cursor-pointer p-3 flex-1'>
              <p className='text-xl font-semibold'>Total Transactions</p>
              <p className=' text-xl'>
                GH₵ {data?.totalTransactions?.toFixed(2)}
              </p>
              <Analytics />
            </div>
          </div>

          <div className='md:col-span-3 lg:col-span-1 hover:cursor-pointer '>
            <div className=' grid-cols-2 grid gap-5 lg:min-h-[400px] hover:cursor-pointer flex-1'>
              <div className='col-span-2 md:col-span-1 lg:col-span-2 space-y-6 shadow-md rounded  min-h-[200px] bg-primary-bg hover:cursor-pointer p-3 flex-1'>
                <p className=' font-bold'>Money in</p>
                <div>
                  <p className=' text-xl'>
                    GH₵ {data?.totalReceived?.toFixed(2)}
                  </p>
                  <p className=' text-secondary-text text-[16px]'>
                    Total received
                  </p>
                </div>
                <p className=' text-md text-primary underline font-bold'>
                  Request money
                </p>
              </div>
              <div className='col-span-2 md:col-span-1 lg:col-span-2 space-y-8 shadow-md rounded  min-h-[200px] bg-primary-bg hover:cursor-pointer p-3 flex-1'>
                <p className=' font-bold'>Money out</p>
                <div>
                  <p className=' text-xl'>GH₵ {data?.totalSent?.toFixed(2)}</p>
                  <p className=' text-secondary-text text-[16px]'>
                    Total sent or spent
                  </p>
                </div>
                <p className=' text-md text-primary underline font-bold'>
                  Send Payments
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className='lg:grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-5 md:gap-y-0'>
          <div className='col-span-2 gap-x-6'>
            <div className='shadow-md rounded  min-h-[550px] bg-primary-bg hover:cursor-pointer p-3 flex-1'>
              <p className='text-xl font-semibold px-5 mb-5'>History</p>

              {data?.transactions?.slice(0, 6)?.map((item: any) => (
                <TransactionCard key={item._id} item={item} />
              ))}

              {data?.transactions?.length > 5 && (
                <div className='flex justify-end mt-3'>
                  <Link href='/transactions'>
                    <p className='text-[14px] underline px-5'>View all</p>
                  </Link>
                </div>
              )}
            </div>
          </div>

          <div className='hover:cursor-pointer space-y-4'>
            <HighestTransactions />
          </div>
        </div>
      </div>
    </div>
  );
}
