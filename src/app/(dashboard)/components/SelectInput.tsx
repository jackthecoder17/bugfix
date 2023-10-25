import React, { useState } from 'react'
import { IconContext } from 'react-icons'
import { FaAngleRight } from 'react-icons/fa'

const SelectInput = ({label, placeholder, options, setValue, value}: {label: string, placeholder: string, options: { text: string, value: string, setValue: (item: { text: string, value: string}) => void }[]}) => {
  const [isOpen, setIsOpen] = useState(false)

  function toggle(){
    setIsOpen(prev => !prev)
  }

  return (
    <div className="flex flex-col w-full">
      <label className='mb-2'>{ label }</label>
      <div role="button" className={`text-gray-500 px-4 py-2 text-xs rounded border-[1px] border-[#B2B2B2] flex items-center justify-between`} onClick={() => toggle()}>
        <p>{placeholder}</p>
        <IconContext.Provider value={{ size: "1em",  className: `transition duration-300  ${ isOpen ? "rotate-90":"rotate-0" }` }}>
          <FaAngleRight />
        </IconContext.Provider>
      </div>
      <div className="w-full relative">
        <div className={`absolute flex w-full bg-white transition-all duration-200 border-[1px] rounded-b-md overflow-auto ${isOpen ? "max-h-[15rem]":"h-0"}`}>
          <ul className="flex flex-col gap-1 w-full p-1 text-sm">
            {
              options.map(item => (
                <li role="button" value={item.value} className="px-3 py-2 w-full text-gray-800 hover:bg-gray-200 transition duration-200" onClick={() => setValue(item)}>{ item.text }</li>
              ))
            }
          </ul>
        </div>
      </div>
    </div>
  )
}

export default SelectInput
