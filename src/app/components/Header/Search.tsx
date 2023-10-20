import React from 'react'
import SearchIcon from "@/app/assets/icons/svg/search.svg"
import Hamburger from "@/app/assets/icons/svg/hamburger.svg"

const Search = ({placeholder}: {
  placeholder: string
}) => {
  return (
    <div className='flex gap-3 items-center w-full'>
      <Hamburger />
      <div className="flex items-center gap-5 px-2 py-1 rounded-[5px] border-[1px] border-blue bg-white">
        <SearchIcon />
        <input type="text"  className="text-sm outline-none border-none " placeholder={placeholder} />
      </div>
    </div>
  )
}

export default Search
