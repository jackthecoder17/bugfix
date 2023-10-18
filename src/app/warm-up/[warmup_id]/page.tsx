"use client"
import React from 'react'
import Image from "next/image"
import { notFound, useParams } from 'next/navigation'
import CheckGreen from "@/app/assets/icons/svg/check-green.svg"
import CheckRed from "@/app/assets/icons/svg/check-red.svg"
import NotFound from "@/app/assets/images/illustrations/page-not-found.svg"

const Warmups = () => {
  const params = useParams()
  let warmups = [
    {
      _id: "wwlkwk",
      no: "01",
      name: "Neww1",
      status: "draft",
      day: 0,
      spamEmail: 0,
      sentEmail: 0
    },
    {
      _id: "asdkfjasdf",
      no: "02",
      name: "warmup 2",
      status: "Sent 15 Aug, 8:30PM",
      day: 0,
      spamEmail: 0,
      sentEmail: 200
    },
  ]

  // 
  warmups =[]

  return (
    <section className='flex w-full h-full overflow-hidden'>
      <div className="flex w-full h-full overflow-x-auto border-x-[0.5px] text-sm">
        <div className="flex flex-col w-full min-w-[60rem]">
          <div className="grid grid-cols-6 gap-3 text-gray-800 p-4 lg:px-8 border-b-[0.5px]">
            <div className="">No</div>
            <div className="">Name</div>
            <div>Status</div>
            <div className="flex justify-center">Day</div>
            <div className="flex justify-center">Spam Email</div>
            <div className="flex justify-center">Email sent</div>
          </div>
          {
            warmups.length === 0 ? (
              <div className="w-full h-full flex justify-center items-center">
                <div className="flex flex-col gap-4 justify-center items-center">
                  <div>
                    <Image src={NotFound} alt={"not-found illustration"}/>
                  </div>
                  <h2 className="text-gray-800 text-2xl text-center font-medium">Warmup not found</h2>
                  <p className="text-gray-500 text-sm text-center">We couldn't find Email that match your search. Please try using <br />different, fewer filters or typing another search request.</p>
                </div>
              </div>
            ):(
                warmups.map(warmup => (
                  <div className="grid grid-cols-6 gap-3 text-gray-500 p-4 lg:px-8 border-b-[0.5px]">
                    <div className="">{warmup.no}</div>
                    <div>{warmup.name}</div>
                    <div className="flex items-center w-full gap-1.5">
                      <div className="w-4 h-4">
                        <Image src={warmup.status === "draft" ? CheckRed:CheckGreen} alt="check mark" className="w-4 h-4"/>
                      </div>
                      {warmup.status}</div>
                    <div className="flex justify-center">{warmup.day}</div>
                    <div className="flex justify-center">{warmup.spamEmail}</div>
                    <div className="flex justify-center">{warmup.sentEmail}</div>
                  </div>
                ))
              )
          }
        </div>
      </div>
    </section>
  )
}

export default Warmups
