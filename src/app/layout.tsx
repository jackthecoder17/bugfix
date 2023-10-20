import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import ReduxProvider from './contexts/ReduxProvider'

const inter = Inter({ subsets: ['latin'], weight: ["300", "400", "500"] })

export const metadata: Metadata = {
  title: 'Magicpitch Warmup',
  description: 'Warmup app',
}

export default function RootLayout({
  children,
}: {
    children: React.ReactNode
  }) {
  return (
    <html lang="en">
      <body className={`${inter.className} w-screen h-screen`}>
        <div className="w-full h-full flex">
          <ReduxProvider>
            <Sidebar />
            <div className="flex flex-col w-full h-full min-w-0">
              <Header />
              {children}
            </div>
          </ReduxProvider>
        </div>
      </body>
    </html>
  )
}
