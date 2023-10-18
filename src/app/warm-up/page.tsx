"use client"
import Image from 'next/image'
import React from 'react'
import { IconContext } from 'react-icons'
import { BsCheckLg as Tick} from "react-icons/bs"
import { FaPlus } from 'react-icons/fa'
import PersonOnSkate from "@/app/assets/images/illustrations/person-on-skate.svg"


const warmupTodo = [
  "Prepare new mailboxes for campaigns",
  "Restore sender and domain reputation",
  "Improve deliverability and inbox placement",
  "Easy set-up, real results"
]

const WarmUp = () => {
  return (
    <section className="w-full h-full overflow-auto flex bg-gray-150">
      <div className="w-full h-full flex flex-col items-center justify-center gap-5">
        <div className="flex gap-5">
          <div>
            <Image src={PersonOnSkate} alt="person-on-skate-illustration"/>
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl text-gray-800 font-medium">Everything you need to <br />warm up your email</h2>
            <ul className="text-gray-500 flex flex-col gap-5">
              {
                warmupTodo.map(item => (
                  <li key={item.slice(0, 10)} className="flex items-center gap-4">
                    <IconContext.Provider value={{ size: "1.5em",  color: "#28B446"}}>
                      <Tick />
                    </IconContext.Provider>
                    <p>{item}</p>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-5 items-center">
          <p className="text-gray-800 text-center">Warm up your mailbox to improve deliverability, grow sender reputation <br className="hidden md:block" /> and prepare new email accounts for campaigns.</p>
          <button type="button" className="capitalize rounded-[7px] bg-blue-500  text-white  flex gap-4 items-center px-6 py-2">
            <IconContext.Provider value={{ color: "" }}>
              <FaPlus />
            </IconContext.Provider>
            <span>add warm-up</span>
          </button>
        </div>
      </div>
    </section>
  )
}

export default WarmUp
