import React from 'react'
import { TiArrowRight } from 'react-icons/ti'

type cardProps = {
  children?: React.ReactNode
  className?: string
  title?: string
}

function Card(props: cardProps) {
  const { className, title } = props

  return (
    <div>
      <div className={`bg-light-bg p-3 text-slate-200 rounded-xl max-w-[320px] ${className}`}>
        <div className='space-y-4'>
          <div className="flex">
            <div className="w-[50px] h-[50px] rounded-full bg-dark-bg "></div>
            <div className='ml-3'>
              <h2 className='text-lg mb-1'>{title || 'Your Balance'}</h2>
              <p className='text-xs'>15% compared to last month</p>
            </div>
          </div>

          <hr />

          <div className="flex justify-between items-center">
            <h1 className='text-xl font-semibold'>$ 23,451.12</h1>
            <p><TiArrowRight className='text-secondary' /></p>
          </div>
        </div>
        {props.children}
      </div>
    </div>
  )
}

export default Card