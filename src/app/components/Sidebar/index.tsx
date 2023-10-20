"use client"
import React from 'react'
import Image from "next/image"
import Link from "next/link"
import Link2 from "../../assets/icons/svg/cast.svg"
import Link3 from "../../assets/icons/svg/Gmail.svg"
import Link4 from "../../assets/icons/svg/server.svg"
import Link5 from "../../assets/icons/svg/image 1.svg"
import Link6 from "../../assets/icons/svg/settings.svg"
import WarmupSidebar from './components/WarmupSidebar'
import MailServersSidebar from './components/MailServersSidebar'
import { usePathname } from 'next/navigation'

interface Sidebar {
  title: string,
  component: React.ReactNode
}

const sidebars: Sidebar[] = [
  {
    title: "Warm-ups",
    component: <WarmupSidebar />
  },
  {
    title: "Mail Servers",
    component: <MailServersSidebar />
  },
]

const Sidebar = () => {
  const pathname = usePathname()
  let secSidebar: Sidebar | null = null

  // add more conditions for the sidebar of other pages
  if (pathname.startsWith("/warm-ups")){
    secSidebar = sidebars[0]
  } else if (pathname.startsWith("/mail-servers")){
    secSidebar = sidebars[1]
  }

  return (
    <section className='flex h-full'>
      { /* primary navigation */}
      <nav className="flex w-fit flex-col gap-2 justify-between bg-blue">
        <ul className="flex flex-col  h-full gap-5 md:gap-10 items-center justify-start py-5 px-2">
          <Link href={"/"} className="shadow-md">
            <Image src={Link5} alt="" className="w-8 h-8" />
          </Link>
          <div className="h-full flex flex-col justify-start gap-5">
            <li className="cursor-pointer">
              <Link href={"/warm-ups"}>
                <Image src={Link2} alt="" className="w-6 h-6" />
              </Link>
            </li>
            <li className="cursor-pointer">
              <Link href={"/mail-servers"}>
                <Image src={Link4} alt="" className="w-5 h-5" />
              </Link>
            </li>
            <li className="cursor-pointer">
              <Link href={"/email-lists"}>
                <Image src={Link3} alt="" className="w-5 h-5" />
              </Link>
            </li>
          </div>
          <li className="cursor-pointer justify-self-end">
            <Link href={"#"}>
              <Image src={Link6} alt="" className="w-6 h-6" />
            </Link>
          </li>
        </ul> 
      </nav>

      { /* secondary navigation */}
      {
        secSidebar && (
          <section className="p-5 w-[15rem] flex flex-col gap-5">
            <h2 className="text-gray-800 text-xl font-bold">{ secSidebar.title }</h2>
            <div className="flex h-full w-full">
              { secSidebar.component }
            </div>
          </section>
        )
      }
    </section>
  )
}

export default Sidebar
