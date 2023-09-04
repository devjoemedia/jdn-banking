'use client'
import { ThemeProvider as Provider } from 'next-themes'
import React from 'react'

const ThemeProvider = ({
  children
}: {
  children: React.ReactNode;
})=>{
  return (
    <Provider themes={['light', 'dark']}>
      {children}
    </Provider>
  )
}

export default ThemeProvider