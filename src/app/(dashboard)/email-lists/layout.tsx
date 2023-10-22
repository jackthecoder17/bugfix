"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import Funel from "@/app/assets/icons/svg/funel.svg"
import Search from '../components/Header/Search'
import { IconContext } from 'react-icons'
import { FaPlus } from 'react-icons/fa'
import { usePathname } from 'next/navigation'
import { routes } from '@/app/constants'
import DragNDrop from './components/DragNDrop'

const buttons =[
  {
    text: "create reply email",
    url: "#"
  },
  {
    text: "create client email",
    url: "#"
  },
]

const EmailListsLayout = ({ children }: {children: React.ReactNode}) => {
  const [isDragNDropOpen, setIsDragNDropOpen] = useState(false)
  let button = buttons[0];
  const pathname = usePathname()
  if(pathname.startsWith(routes.CLIENT_EMAILS)){
    button = buttons[1]
  }

  function openDragNDrop(){
    setIsDragNDropOpen(true)
  }

  return (
    <section className='flex w-full h-full overflow-hidden relative'>
      {
        isDragNDropOpen && <DragNDrop close={() => setIsDragNDropOpen(false)}/>
      }
      <div className="flex flex-col w-full h-full border-x-[0.5px] text-sm">
        <div className="flex justify-between w-full h-fit  items-center p-5">
          <button type="button" onClick={() => openDragNDrop()} className="capitalize rounded-[7px] bg-blue-500  text-white  flex items-center gap-4 px-6 py-2">
            <IconContext.Provider value={{ color: "" }}>
              <FaPlus />
            </IconContext.Provider>
            <span>{ button.text }</span>
          </button>
          <div className="w-fit">
            {
              pathname.startsWith(routes.CLIENT_EMAILS) ? (
                <Search placeholder={"Search Emails"} FlareIcon={<Funel />} hideSearchIcon={true} hideBorder={true} />
              ):(
                  <Search placeholder={"Search Emails"} hideSearchIcon={true} hideBorder={true} hideFlare={true} />
                )
            }
          </div>
        </div>

        <div className="flex overflow-auto h-full w-full">
          <div className="flex flex-col w-full min-w-[60rem]">
            <div className="grid grid-cols-5 gap-3 text-gray-800 p-4 lg:px-8 border-b-[0.5px] w-full">
              <div className="col-span-1 w-10">No</div>
              <div className="col-span-1">Name</div>
              <div className="col-span-1 flex justify-center">Date</div>
              <div className="col-span-1 flex justify-center">Lorem</div>
              <div className="col-span-1 flex justify-center">Sent Email</div>
            </div>
            {children}
          </div>
        </div>
      </div>
    </section>
  )
}

export default EmailListsLayout
