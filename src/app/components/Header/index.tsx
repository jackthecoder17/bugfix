"use client"
import React from 'react'
import { IconContext } from 'react-icons'
import { FaAngleDown  } from "react-icons/fa"
import {BsArrowLeftShort as ArrowLeft} from "react-icons/bs"
import Image from "next/image"
import Notification from "../../assets/icons/svg/Notification.svg"
import Profile from "../../assets/images/profile-images/Ellipse 1.png"
import ToolbarButton from './ToolbarButton'
import {BsX as XMark} from "react-icons/bs"
import PlayOutline from "@/app/assets/icons/svg/play-outline.svg"
import Book from "@/app/assets/icons/svg/book.svg"
import { usePathname } from 'next/navigation'

const Header = () => {
  const pathname = usePathname()
  let isShowSecondary = true
  if (pathname === "/" || pathname === "/warm-up/new/details"){
    isShowSecondary = false
  }

  return (
    <header className="w-full h-fit flex flex-col">
      {/* primary header  */}
      <section className='w-full h-full flex gap-5 justify-end px-5 md:px-10 py-3 items-center shadow-md bg-white'>
        <button type="button" className="cursor-pointer">
          <Image src={Notification} className="w-5 h-5" alt="notification"/>
        </button>
        <div className="flex gap-2 items-center">
          <div>
            <Image src={Profile} className="w-8 h-8 rounded-full" alt="profile image" />
          </div>
          <IconContext.Provider value={{ size: "1.2em", color: "#8F8B8B", className: "cursor-pointer" }}>
            <FaAngleDown />
          </IconContext.Provider>
        </div>
      </section>

      {/* Secondary header  */}
      {
        isShowSecondary && (
          <section className="bg-gray-100 flex gap-2 w-full justify-between items-center pr-5 md:pr-10  py-3 relative">
            <button type="button" className="rounded-full bg-gray-200 transition duration-200 -translate-x-1/2 w-7 h-7 flex justify-center items-center">
              <IconContext.Provider value={{ size: "2em", className: "cursor-pointer p-1", color: "#2F2F2F"}}>
                <ArrowLeft />
              </IconContext.Provider>
            </button>
            <div className="flex gap-3 items-center w-full justify-between">
              <p className="text-gray-500">Learn how to use Email list for higher lead engagement and more replies</p>
              <div className="flex gap-3.5 items-center">
                <ToolbarButton altText="play icon" text="Watch tutorial" icon={PlayOutline} />
                <ToolbarButton altText="book icon" text="Read Guide" icon={Book} />
              </div>
              <button type='button' className="p-2 rounded-full hover:bg-white transition duration-200">
                <IconContext.Provider value={{size: "1.5em", className: "cursor-pointer", color: "#2F2F2F"}}>
                  <XMark />
                </IconContext.Provider>
              </button>
            </div>
          </section>
        )
      }
    </header>
  )
}

export default Header
