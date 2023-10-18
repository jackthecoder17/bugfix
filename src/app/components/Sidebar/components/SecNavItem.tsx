import React from 'react'
import Image from "next/image"
import { StaticImport } from 'next/dist/shared/lib/get-img-props'

const SecNavItem = ({ icon, altText, text, count }: {
  icon: StaticImport,
  altText: string,
  text: string,
  count: number
}) => {
  return (
    <div className="w-full flex gap-4 items-center text-sm">
      <div className="">
        <Image src={icon} className="w-6 h-6"  alt={altText}/>
      </div>
      <p className="text-gray-800 w-full">{text}</p>
      <p className="text-gray-500">{count}</p>
    </div>
  )
}

export default SecNavItem
