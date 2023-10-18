import type { Metadata } from 'next'
import { Inter, Montserrat } from 'next/font/google'
import './globals.css'
import Sidebar from './components/Sidebar'
import Header from './components/Header'

const inter = Inter({ subsets: ['latin'], weight: ["300", "400"] })

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
          <Sidebar />
          <div className="flex flex-col w-full h-full bg-[yellow]">
            <Header />
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
