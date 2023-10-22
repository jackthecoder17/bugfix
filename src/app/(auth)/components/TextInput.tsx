import React from 'react'

const TextInput = ({ label, placeholder, inputType }: {
  label: string, placeholder: string, inputType?: string 
}) => {
  return (
    <div className="w-full">
      <label className="flex flex-col gap-1 w-full">
        <p className='text-gray-500 text-start capitalize'>{ label }</p>
        <input type={inputType ?? "text"} className="px-3 w-full py-2.5 rounded border-[1px] border-[#C2C2C2] outline-none" placeholder={placeholder}  />
      </label>
    </div>
  )
}

export default TextInput
