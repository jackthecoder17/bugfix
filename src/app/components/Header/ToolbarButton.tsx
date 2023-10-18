import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'
import React from 'react'

const ToolbarButton = ({ text, icon, altText }: {
  text: string,
  icon: StaticImport,
  altText: string
}) => {
  return (
    <button className="rounded-md flex items-center gap-2 text-sm text-blue-300 border-2 border-blue-300 px-3 py-1.5">
      <div>
        <Image alt={altText} src={icon} className="w-5 h-5"/>
      </div>
      <span className="text-gray-800">{text}</span>
    </button>
  )
}

export default ToolbarButton
