"use client"
import React from 'react'
import { IconContext } from 'react-icons'
import { FaAngleDown } from "react-icons/fa"
import Image from "next/image"
import Notification from "../assets/icons/svg/Notification.svg"
import Profile from "../assets/images/profile-images/Ellipse 1.png"

const Header = () => {
  return (
    <header className="w-full h-fit flex gap-5 justify-end px-5 md:px-10 py-2 items-center shadow-md bg-white">
      <button type="button" className="cursor-pointer">
        <Image src={Notification} className="w-5 h-5" alt="notification"/>
      </button>
      <div className="flex gap-2 items-center">
        <div>
          <Image src={Profile} className="w-8 h-8 rounded-full" alt="profile image" />
        </div>
        <IconContext.Provider value={{ size: "1.5em", color: "#8F8B8B", className: "cursor-pointer" }}>
          <FaAngleDown />
        </IconContext.Provider>
      </div>
    </header>
  )
}

export default Header
