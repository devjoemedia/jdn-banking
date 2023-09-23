'use client'
import TransactionCard from '@/components/TransactionCard'
import useCustonFetch from 'app/hooks/useCustonFetch';

const Transactions = () => {
  const {data} = useCustonFetch({url: '/transactions', queryKey: ['allTransactions']})

  return (
    <div className=" p-5 md:p-8 space-y-5">

      <div className='space-y-3 text-primary-text shadow-md bg-primary-bg p-3'>
        <div className="flex justify-between items-center ">
          <h1 className='mb-2  text-lg'>Recent Transactions</h1>

          <div>
            <select className='outline-none w-[150px] bg-secondary-bg text-secondary-text px-3 py-1'>
              <option value=''>all</option>
              <option value=''>Completed</option>
              <option value=''>Pending</option>
              <option value=''>Cancel</option>
            </select>
          </div>
        </div>
        <hr />

        {data?.transactions?.map((item: any) => (
          <TransactionCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  )
}

export default Transactions