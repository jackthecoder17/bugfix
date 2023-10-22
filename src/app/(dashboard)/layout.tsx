import React from 'react'
import ReduxProvider from "@/app/(dashboard)/contexts/ReduxProvider"
import Sidebar from  "@/app/(dashboard)/components/Sidebar"
import Header from '@/app/(dashboard)/components/Header'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Magicpitch Warmup',
  description: 'Warmup app',
}

const DashboardLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="w-full h-full flex">
      <ReduxProvider>
        <Sidebar />
        <div className="flex flex-col w-full h-full min-w-0">
          <Header />
          {children} 
        </div>
      </ReduxProvider>
    </div>
  )
}

export default DashboardLayout
