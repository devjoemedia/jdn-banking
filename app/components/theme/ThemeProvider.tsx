'use client'
import { ThemeProvider as Provider } from 'next-themes'
import React from 'react'

const ThemeProvider = ({
  children
}: {
  children: React.ReactNode;
})=>{
  return (
    <Provider themes={['light', 'dark']} defaultTheme='dark' enableSystem={false}>
      {children}
    </Provider>
  )
}

export default ThemeProvider