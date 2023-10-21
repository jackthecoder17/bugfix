"use client"
import React from 'react'
import SearchIcon from "@/app/assets/icons/svg/search.svg"
import Hamburger from "@/app/assets/icons/svg/hamburger.svg"

const Search = ({placeholder, hideFlare = false, FlareIcon = <Hamburger />, hideBorder = false, hideSearchIcon = false }: {
  placeholder: string, hideFlare?: boolean, FlareIcon?: React.ReactNode, hideBorder?: boolean, hideSearchIcon?: boolean
}) => {
  return (
    <div className='flex gap-3 items-center w-full'>
      {!hideFlare && FlareIcon }
      <div className={`flex items-center gap-5 px-2 py-1 rounded-[5px] bg-white ${hideBorder ? "border-none":"border-[1px] border-blue"}`}>
        {!hideSearchIcon && <SearchIcon />}
        <input type="text"  className="text-sm outline-none border-none " placeholder={placeholder} />
      </div>
    </div>
  )
}

export default Search
