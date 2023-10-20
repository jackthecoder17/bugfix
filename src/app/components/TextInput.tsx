import React from 'react'

const TextInput = ({label, placeholder}: {label: string, placeholder: string}) => {
  return (
  <div className="flex flex-col gap-2 w-full">
      <label className="text-gray-800">{label}</label>
      <input type="text" className="text-gray-500 px-4 py-2 text-xs rounded border-[1px] border-[#B2B2B2]" placeholder={placeholder}/>
    </div>
  )
}

export default TextInput
