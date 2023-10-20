"use client"
import Image from 'next/image'
import React from 'react'
import { IconContext } from 'react-icons'
import { BsCheckLg as Tick} from "react-icons/bs"
import { FaPlus } from 'react-icons/fa'
import PersonOnSkate from "@/app/assets/images/illustrations/person-on-skate.svg"

const features = [
  "Prepare new mailboxes for campaigns",
  "Restore sender and domain reputation",
  "Improve deliverability and inbox placement",
  "Easy set-up, real results"
]

export default function EmptyListPlaceholder({ title, ctaLabel, ctaAction }: {
  title: string,
  ctaLabel: string,
  ctaAction: () => void
}) {
  return (
    <section className="w-full h-full overflow-auto flex bg-gray-150">
      <div className="w-full h-full flex flex-col items-center justify-center gap-5">
        <div className="flex gap-5">
          <div>
            <Image src={PersonOnSkate} alt="person-on-skate-illustration"/>
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl text-gray-800 font-medium">{title}</h2>
            <ul className="text-gray-500 flex flex-col gap-5">
              {
                features.map(item => (
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
          <button type="button" className="capitalize rounded-[7px] bg-blue-500  text-white  flex gap-4 items-center px-6 py-2" onClick={() => ctaAction()}>
            <IconContext.Provider value={{ color: "" }}>
              <FaPlus />
            </IconContext.Provider>
            <span>{ctaLabel}</span>
          </button>
        </div>
      </div>
    </section>
  )
}
