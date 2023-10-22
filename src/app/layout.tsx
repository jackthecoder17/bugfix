import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], weight: ["300", "400", "500"] })

export default function RootLayout({
  children,
}: {
    children: React.ReactNode
  }) {
  return (
    <html lang="en">
      <body className={`${inter.className} w-screen h-screen`}>
        {children}
      </body>
    </html>
  )
}
