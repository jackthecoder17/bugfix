import React from 'react'

const ToolbarButton = ({ text, Icon, altText }: {
  text: string,
  Icon: React.ReactNode,
  altText: string
}) => {
  return (
    <button className="rounded-md flex items-center gap-2 text-sm text-blue-300 border-[1px] border-blue-300 px-3 py-1.5">
      <div>
        {Icon}
      </div>
      <span className="text-gray-800 hidden md:inline">{text}</span>
    </button>
  )
}

export default ToolbarButton
