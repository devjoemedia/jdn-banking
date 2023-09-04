import React from 'react'

const SavingsPlan = () => {
  return (
    <div className='space-y-2 hover:cursor-pointer'>
      <div className="flex justify-between items-center">
        <h4 className='text-sm'>BirthDay</h4>
        <p className='text-xs text-slate-500'>Target: July 12 2023</p>
      </div>
      
      <div className="flex justify-between items-center">
        <h4 className='text-sm font-bold'><span>$ 15,344.34</span> <span className='text-[10px] text-slate-500'>/$ 10,032.12</span></h4>
        <p className='text-xs text-secondary'>79%</p>
      </div>
      <div className="h-1 w-full bg-slate-500 rounded-full mt-[5px] overflow-hidden">
        <div className="h-full w-[45%] bg-secondary "></div>
      </div>
    </div>
  )
}

export default SavingsPlan