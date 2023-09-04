import React from 'react'
import TransactionCard from '../components/TransactionCard'

const Payments = () => {
  return (
    <div className="space-y-5 px-5">
      <div className='space-y-5'>
        <div className="flex justify-between items-center">
          <h1 className='mb-2  text-lg text-white '>Recent Transaction</h1>

          <p className='text-secondary'>See All</p>
        </div>
        <hr />

        <TransactionCard />
        <TransactionCard />
        <TransactionCard />
        <TransactionCard />
        <TransactionCard />
      </div>
    </div>
  )
}

export default Payments