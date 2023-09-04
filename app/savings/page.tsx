import React from 'react'
import SavingsPlan from '@/components/SavingsPlan'

const Savings = () => {
  return (
    <div className="space-y-5 px-5">
      <div className='space-y-6'>
        <div className="flex justify-between items-center">
          <h1 className='mb-2  text-lg text-white '>Savings Plan</h1>

          <p className='text-secondary'>See All</p>
        </div>
        <hr />

        <SavingsPlan />
        <SavingsPlan />
        <SavingsPlan />
      </div>
    </div>
  )
}

export default Savings