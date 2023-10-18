"use client"
import React from 'react'
import Link from "next/link"
import { IconContext } from 'react-icons'
import { FaPlus } from 'react-icons/fa'
import SecNavItem from './SecNavItem'
import Disk from "@/app/assets/icons/svg/Vector.svg"
import Trash from "@/app/assets/icons/svg/Vector-1.svg"

const WarmupSidebar = () => {
  return (
    <div className="flex flex-col w-full h-full justify-between gap-3">
      <Link href={"/warm-up/new"} type="button" className="capitalize rounded-[7px] bg-blue text-white  flex justify-center gap-4 items-center px-5 py-2">
        <IconContext.Provider value={{ color: "" }}>
          <FaPlus />
        </IconContext.Provider>
        <span>add new</span>
      </Link>

      <div className="flex flex-col w-full gap-5">
        <SecNavItem icon={Disk} text="All Warm-ups" count={0} altText='warm-ups icon' />
        <SecNavItem icon={Trash} text="Delete" count={0} altText='trash can icon' />
      </div>
    </div>
  )
}

export default WarmupSidebar
